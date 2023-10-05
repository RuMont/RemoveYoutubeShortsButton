// ==UserScript==
// @name         Remove Shorts button
// @namespace    https://www.youtube.com/*
// @version      0.1
// @description  removes shorts button and kicks you out from the shorts page
// @author       Rumont
// @match        https://www.youtube.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=youtube.com
// @grant        none
// ==/UserScript==

(function () {
    'use strict';
    const kickFromShortsPage = () => {
        if (window.location.href.includes('/shorts')) window.location.replace("https://www.youtube.com");
    }

    const removeShortsButton = setInterval(function () {
        if (document.querySelector('a[title="Shorts"]') != null) {
            document.querySelector('a[title="Shorts"]').remove();
            clearInterval(removeShortsButton);
        }
    }, 20);

    const deleteShortsSections = () => {
        const observer = new MutationObserver((mutations) => {
            const sections = document.querySelectorAll('#contents > ytd-rich-section-renderer');
            if (sections.length) {
                sections.forEach(s => s.remove());
            }
        });
        observer.observe(document, {attributes: false, childList: true, characterData: false, subtree:true});
    }

    window.addEventListener('yt-page-type-changed', (e) => {
        kickFromShortsPage();
    });

    kickFromShortsPage();
    deleteShortsSections();
})();
