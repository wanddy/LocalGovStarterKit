using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Caching;

using Umbraco.Core;
using Umbraco.Core.Models;
using Umbraco.Core.Cache;

using Umbraco.Web;
using Umbraco.Core.Logging;
using System.Diagnostics;
using Umbraco.Core.Services;
using Umbraco.Core.Publishing;
using Umbraco.Core.Events;

namespace LGStarterKit.AtoZ
{
    /// <summary>
    ///  manages the cache on publish/unpublish events, when something is published we 
    ///  clear the cache, the next user to visit the atoz will then trigger a rebuild
    /// </summary>
    public class AtoZCacheEventHelper : ApplicationEventHandler
    {
        protected override void ApplicationStarted(UmbracoApplicationBase umbracoApplication, ApplicationContext applicationContext)
        {
            ContentService.Published += ContentServicePublishedEvent;
            ContentService.UnPublished += ContentServicePublishedEvent;
        }

        private void ContentServicePublishedEvent(IPublishingStrategy sender, PublishEventArgs<IContent> e)
        {
            // clear the atoz's
            // this is the quick way, clear any atoz cache when something is published or unpublished
            // we could at this point find the root of each published item and only clear the root
            // of that atoz - or indeed you could build the atoz on publish, but this would only 
            // slow down publish, for something that is not always used. 

            // even on a biggish site, an atoz can be built in around 1 second
            ApplicationContext.Current.ApplicationCache.RuntimeCache.ClearCacheByKeySearch("AtoZPages");
        }
    }


    /// <summary>
    ///  Manages and builds a AtoZ Cache for site wide or sections of the site
    ///  makes the atoz quicker, and puts a lot less load on the site for what
    ///  is usally a little used bit of functionality. 
    ///  
    ///  this is the basic atoz cache, often you need to add alternate entries
    ///  you can do this just looking for those properties as you loop through
    ///  site pages, and adding them as alternates. 
    ///  
    ///  this implimentation is the starter sample to get you going 
    /// </summary>
    public static class AtoZCacheHelper 
    {
        private static SortedDictionary<string, AtoZInfo> GetAtoZPages(UmbracoHelper umbHelper, string[] excludedTypes)
        {
            var root = umbHelper.TypedContentAtRoot().First();
            return GetAtoZPages(umbHelper, excludedTypes, root);
        }

        private static SortedDictionary<string, AtoZInfo> GetAtoZPages(UmbracoHelper umbHelper, string[] excludedTypees, IPublishedContent root)
        {
            var cacheName = string.Format("AtoZPages_{0}", root.Id);
            var appCache = ApplicationContext.Current.ApplicationCache.RuntimeCache;

            SortedDictionary<string, AtoZInfo> azPages = appCache.GetCacheItem<SortedDictionary<string, AtoZInfo>>(cacheName);

            if (azPages == null)
            {
                Stopwatch sw = new Stopwatch();
                sw.Start();

                // no cache, we need to build it. 
                LogHelper.Debug<AtoZCacheEventHelper>("Building Cache: {0}", () => cacheName);

                azPages = new SortedDictionary<string, AtoZInfo>();

                var sitePages = root.Descendants().Where(
                                    x => x.IsVisible()
                                    && !excludedTypees.Contains(x.DocumentTypeAlias)
                                    && !x.GetPropertyValue<bool>("excludeFromAtoZ")
                                    && !x.HasProperty("isComponent"));

                foreach(var page in sitePages)
                {
                    var title = page.GetPropertyValue<string>("title", page.Name).Trim();
                    if (!azPages.ContainsKey(title))
                    {
                        azPages.Add(title, new AtoZInfo()
                        {
                            Title = title,
                            id = page.Id,
                            url = page.Url
                        });
                    }
                }

                appCache.InsertCacheItem<SortedDictionary<string, AtoZInfo>>
                    (cacheName, () => azPages, priority: CacheItemPriority.Default);

                sw.Stop();

                LogHelper.Debug<AtoZCacheEventHelper>("Build cache {0} for {1} pages in {2}ms",
                    () => cacheName, () => azPages.Count(), () => sw.ElapsedMilliseconds);
            }

            return azPages;
        }

        public static SortedDictionary<string, AtoZInfo> GetAtoZEntries(this UmbracoHelper umbraco, string letter)
        {
            return GetAtoZEntries(umbraco, letter, new string[] { });
        }

        public static SortedDictionary<string, AtoZInfo> GetAtoZEntries(this UmbracoHelper umbraco, string letter, string[] exludedTypes)
        {
            var root = umbraco.TypedContentAtRoot().First();
            return GetAtoZEntries(umbraco, letter, new string[] { }, root);
        }

        public static SortedDictionary<string, AtoZInfo> GetAtoZEntries(this UmbracoHelper umbraco, string letter, string[] exludedTypes, IPublishedContent root)
        {
            SortedDictionary<string, AtoZInfo> atoz = GetAtoZPages(umbraco, exludedTypes, root);

            var sorted = new SortedDictionary<string, AtoZInfo> ();
            var entries = atoz.Where(x => GetPYChar(x.Key.Substring(0, 1)) == letter.ToLower());
            entries.ForEach(x => sorted.Add(x.Key, x.Value));

            return sorted;
            
        }
        /// <summary>
        /// 取单个字符的拼音声母
        /// </summary>
        /// <param name="c">要转换的单个汉字</param>
        /// <returns>拼音声母</returns>
        private static string GetPYChar(string c)
        {
            if (Convert.ToInt32(Convert.ToChar(c.Substring(0, 1))) < Convert.ToInt32(Convert.ToChar(128))) return c.ToLower();
            byte[] array = new byte[2];
            //if (System.Text.Encoding.Default.CodePage != 936)
                array = System.Text.Encoding.GetEncoding(936).GetBytes(c);//只支持中文
            //else
            //array = System.Text.Encoding.Default.GetBytes(c);
            int i = (short)(array[0] - '\0') * 256 + ((short)(array[1] - '\0'));

            if (i < 0xB0A1) return c.ToLower();
            if (i < 0xB0C5) return "a";
            if (i < 0xB2C1) return "b";
            if (i < 0xB4EE) return "c";
            if (i < 0xB6EA) return "d";
            if (i < 0xB7A2) return "e";
            if (i < 0xB8C1) return "f";
            if (i < 0xB9FE) return "g";
            if (i < 0xBBF7) return "h";
            if (i < 0xBFA6) return "j";
            if (i < 0xC0AC) return "k";
            if (i < 0xC2E8) return "l";
            if (i < 0xC4C3) return "m";
            if (i < 0xC5B6) return "n";
            if (i < 0xC5BE) return "o";
            if (i < 0xC6DA) return "p";
            if (i < 0xC8BB) return "q";
            if (i < 0xC8F6) return "r";
            if (i < 0xCBFA) return "s";
            if (i < 0xCDDA) return "t";
            if (i < 0xCEF4) return "w";
            if (i < 0xD1B9) return "x";
            if (i < 0xD4D1) return "y";
            if (i < 0xD7FA) return "z";

            return c.ToLower();
        }
    }

    /// <summary>
    ///  info that is stored in the cache. 
    /// </summary>
    public class AtoZInfo
    {
        public string Title { get; set; }
        public int id { get; set; }
        public string url { get; set; }
    }
}