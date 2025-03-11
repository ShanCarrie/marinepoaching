import { Feed } from "feed";

export const generateRss = async (posts) => {
  const feed = new Feed({
    title: "Marine Poaching Blog",
    description: "Latest news and articles on Marine Poaching",
    id: "http://localhost:3000/",
    link: "http://localhost:3000/",
    language: "en",
    favicon: "http://localhost:3000/favicon.ico",
    copyright: `All rights reserved ${new Date().getFullYear()}`,
  });

  posts.forEach((item) => {
    feed.addItem({
      title: item.title,
      id: `http://localhost:3000/blog/posts/${item.slug}`,
      link: `http://localhost:3000/blog/posts/${item.slug}`,
      description: item.desc,
      date: new Date(item.createdAt),
    });
  });

  feed.addItem({
    title:
      "Study Exposes Illegal Fishing by Chinese Vessels in Tanzanian Waters",
    id: "https://thechanzo.com/2024/04/22/study-exposes-illegal-fishing-by-chinese-vessels-in-tanzanian-waters",
    link: "https://thechanzo.com/2024/04/22/study-exposes-illegal-fishing-by-chinese-vessels-in-tanzanian-waters",
    description:
      "An investigative study reveals illegal fishing practices by Chinese vessels in Tanzanian waters.",
    date: new Date(),
  });

  feed.addItem({
    title:
      "Illegal Fishing and Labor Abuse Rampant in China's Indian Ocean Fleet",
    id: "https://news.mongabay.com/2024/06/report-illegal-fishing-and-labor-abuse-rampant-in-chinas-indian-ocean-fleet",
    link: "https://news.mongabay.com/2024/06/report-illegal-fishing-and-labor-abuse-rampant-in-chinas-indian-ocean-fleet",
    description:
      "Report highlights widespread illegal fishing and labor abuse by China's Indian Ocean fleet.",
    date: new Date(),
  });

  feed.addItem({
    title: "China's Fishing Fleet Causing Havoc off Africa's Coasts",
    id: "https://www.economist.com/middle-east-and-africa/2024/04/11/chinas-fishing-fleet-is-causing-havoc-off-africas-coasts",
    link: "https://www.economist.com/middle-east-and-africa/2024/04/11/chinas-fishing-fleet-is-causing-havoc-off-africas-coasts",
    description:
      "China's fishing fleet is wreaking havoc off Africa's coasts, threatening marine ecosystems.",
    date: new Date(),
  });

  feed.addItem({
    title:
      "EJF Analysis of China's Distant Water Fleet Alleges Connections to IUU, Human Rights Issues",
    id: "https://www.seafoodsource.com/news/environment-sustainability/ejf-analysis-of-china-s-distant-water-fleet-alleges-connections-to-iuu-human-rights-issues",
    link: "https://www.seafoodsource.com/news/environment-sustainability/ejf-analysis-of-china-s-distant-water-fleet-alleges-connections-to-iuu-human-rights-issues",
    description:
      "EJF analysis links China's distant water fleet to IUU fishing and human rights issues.",
    date: new Date(),
  });

  feed.addItem({
    title: "New Report Details Chinese Ownership of Illegal Fishing Vessels",
    id: "https://adf-magazine.com/2022/12/new-report-details-chinese-ownership-of-illegal-fishing-vessels",
    link: "https://adf-magazine.com/2022/12/new-report-details-chinese-ownership-of-illegal-fishing-vessels",
    description:
      "Report reveals Chinese ownership of vessels engaged in illegal fishing.",
    date: new Date(),
  });

  feed.addItem({
    title: "Tanzania Fines Chinese Fishing Vessels for Illegal Fishing",
    id: "https://www.seashepherdscandinavia.org/latest-news/tanzania-fines",
    link: "https://www.seashepherdscandinavia.org/latest-news/tanzania-fines",
    description:
      "Tanzania fines Chinese fishing vessels caught engaging in illegal fishing activities.",
    date: new Date(),
  });

  feed.addItem({
    title: "Illegal PRC Fishing Hurts East African Communities, Report Says",
    id: "https://ipdefenseforum.com/2024/06/illegal-prc-fishing-hurts-east-african-communities-report-says",
    link: "https://ipdefenseforum.com/2024/06/illegal-prc-fishing-hurts-east-african-communities-report-says",
    description:
      "Illegal fishing by PRC vessels is causing economic damage to East African communities.",
    date: new Date(),
  });

  return feed.rss2();
};
