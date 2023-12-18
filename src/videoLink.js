/* eslint-disable */

const videoLinkRegex = {
  vimeo:
    /(?:http[s]?:\/\/)?(?:www.)?(?:player.)?vimeo\.co(?:.+\/([^\/]\d+)(?:#t=[\d]+)?s?$)/,
  youtube: /(?:https?:\/\/)?(?:www\.)?(?:(?:youtu\.be\/)|(?:youtube\.com)\/(?:v\/|u\/\w\/|embed\/|watch))(?:(?:\?v=)?([^#&?=]*))?((?:[?&]\w*=\w*)*)/,
  dailymotion: /(?:https?:\/\/)?(?:www\.)?dailymotion\.com\/video\/([^_]+)/,
  coub: /https?:\/\/coub\.com\/view\/([^\/\?\&]+)/,
  vine: /https?:\/\/vine\.co\/v\/([^\/\?\&]+)/,
  imgur: /https?:\/\/(?:i\.)?imgur\.com.*\/([a-zA-Z0-9]+)(?:\.gifv)?/,
  gfycat: /https?:\/\/gfycat\.com(?:\/detail)?\/([a-zA-Z]+)/,
  'twitch-channel': /https?:\/\/www\.twitch\.tv\/([^\/\?\&]*)\/?$/,
  'twitch-video': /https?:\/\/www\.twitch\.tv\/(?:[^\/\?\&]*\/v|videos)\/([0-9]*)/,
  'yandex-music-album': /https?:\/\/music\.yandex\.ru\/album\/([0-9]*)\/?$/,
  'yandex-music-track': /https?:\/\/music\.yandex\.ru\/album\/([0-9]*)\/track\/([0-9]*)/,
  'yandex-music-playlist': /https?:\/\/music\.yandex\.ru\/users\/([^\/\?\&]*)\/playlists\/([0-9]*)/,
  codepen: /https?:\/\/codepen\.io\/([^\/\?\&]*)\/pen\/([^\/\?\&]*)/,
  instagram: /https?:\/\/www\.instagram\.com\/p\/([^\/\?\&]+)\/?.*/,
  twitter: /^https?:\/\/twitter\.com\/(?:#!\/)?(\w+)\/status(?:es)?\/(\d+?.*)?$/,
  pinterest: /https?:\/\/([^\/\?\&]*).pinterest.com\/pin\/([^\/\?\&]*)\/?$/,
  facebook: /https?:\/\/www.facebook.com\/([^\/\?\&]*)\/(.*)/,
  aparat: /(?:http[s]?:\/\/)?(?:www.)?aparat\.com\/v\/([^\/\?\&]+)\/?/,
  miro: /https:\/\/miro.com\/\S+(\S{12})\/(\S+)?/,
  github: /https?:\/\/gist.github.com\/([^\/\?\&]*)\/([^\/\?\&]*)/,
};

export const isVideoLink = (string) =>
  Object.values(videoLinkRegex).some((videoRegex) => videoRegex.test(string));
