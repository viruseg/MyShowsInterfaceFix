// ==UserScript==
// @name         Interface fixes on myshows.me
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Fixing interface styles on myshows.me
// @author       viruseg
// @match        *.myshows.me/*
// @run-at       document-start
// @grant        GM_addStyle
// @icon         https://myshows.me/favicon-32x32.png
// @author       viruseg
// @homepageURL  https://github.com/viruseg/MyShowsInterfaceFix
// @updateURL    https://raw.githubusercontent.com/viruseg/MyShowsInterfaceFix/master/dist/main.js
// @downloadURL  https://raw.githubusercontent.com/viruseg/MyShowsInterfaceFix/master/dist/main.js
// @supportURL   https://github.com/viruseg/MyShowsInterfaceFix/issues
// ==/UserScript==

GM_addStyle(
`
.Unwatched-showTitle-title{
  font-weight: 500!important;
}

.Unwatched-season~div .UnwatchedEpisodeItem, .RowEpisodeBySeason > .Row-container > div {
	padding-top: 5px!important;
	padding-bottom: 5px!important;
}

.RowEpisodeBySeason > .Row-container {
	height: 30px;
}

.Comment__actions {
    border-bottom: 1px solid var(--border-gray-color) !important;
}

.EpisodeWatchLabel {
  width: 13px!important;
  height: 13px!important;
}

.episodes-by-season__season .MyLabel.corner,
.Unwatched-item .MyLabel.corner
{
  text-align: center!important;
}

.episodes-by-season__season .MyLabel.corner > .MyLabel__wrapper,
.Unwatched-item .MyLabel.corner > .MyLabel__wrapper
{
  border-radius: 2px!important;
  background-color: var(--color-gray-170) !important;
}

.dark-mode .episodes-by-season__season .MyLabel.corner > .MyLabel__wrapper,
.dark-mode .Unwatched-item .MyLabel.corner > .MyLabel__wrapper
{
  background-color: var(--comments-label-color) !important;
}

.episodes-by-season__season .MyLabel.corner > .MyLabel__wrapper > .MyLabel__corner,
.Unwatched-item .MyLabel.corner > .MyLabel__wrapper > .MyLabel__corner
{
  color: transparent!important;
  width: 0!important;
  border: unset!important;
}

.episode-col {
  font-size: 14px!important;
}

.UnwatchedEpisodeItem__index {
  width: 16px!important;
  display: flex!important;
  justify-content: flex-end!important;
}

.collapseAll {
    display: block;
    cursor: pointer;
    right: 22.7rem;
    position: absolute;
    color: var(--info-color);
}

a.episode-col__label:hover {
    text-decoration: none;
}

.TopNavigation__wrapper {
    gap: 5px;
}

.TopNavigation__wrapper button.TopNavigation__link {
    font-size: 15px;
    line-height: 20px;
    padding: 5px 8px;
}

.Row-container .Col {
    padding: 4px 0;
}

.episodes-by-season__season .Row-container {
    padding-left: 20px;
}
`);

(function()
{
    'use strict';

    function CorrectionOfGrammaticalErrors()
    {
        let wordsToReplace = ['Смотрящих', 'Смотрящий', 'Смотрящие'];
        let replacementWords = ['Зрителей', 'Зритель', 'Зрители'];

        if (wordsToReplace.length !== replacementWords.length)
        {
            console.error('The wordsToReplace and replacementWords arrays must have the same length.');
            return;
        }

        let regExps = [];

        for (let i = 0; i < wordsToReplace.length; i++)
        {
            regExps[i] = new RegExp(wordsToReplace[i], 'g');
        }

        function Replace(nodes)
        {
            for (let i = 0; i < nodes.length; i++)
            {
                let node = nodes[i];

                for (let j = 0; j < regExps.length; j++)
                {
                    if (node.innerText.search(regExps[j]) === -1) continue;

                    node.innerText = node.innerText.replace(regExps[j], replacementWords[j]);
                }
            }
        }

        Replace(document.querySelectorAll('.info-row__title'));
    }

    function CollapseAll()
    {
        let nodes = document.querySelectorAll('.Col.center.all:has(> .SvgSpriteIcon.Unwatched-toggler.collapsed)');

        nodes.forEach(function(element)
        {
            element.click();
        });
    }

    function AddCollapseAllButton()
    {
        if (new URL(window.location.href).pathname !== '/profile/') return;

        let menu = document.querySelector('.Container>ul');

        if (menu === null) return;

        let collapseAllButton = document.querySelector('#collapseAll');

        if (collapseAllButton !== null) return;

        collapseAllButton = document.createElement('div');
        collapseAllButton.id = 'collapseAll';
        collapseAllButton.classList.add('collapseAll')
        collapseAllButton.innerText = `Свернуть всё`;
        collapseAllButton.addEventListener('click', CollapseAll);
        menu.append(collapseAllButton);
    }

    function FixWidthCommentButtons()
    {
        const elements = document.querySelectorAll('.episodes-by-season__season .MyLabel.corner, .Unwatched-item .MyLabel.corner');

        if (elements.length === 0) return;

        let maxWidth = 0;
        elements.forEach(element =>
        {
            const elementWidth = element.offsetWidth;
            if (elementWidth > maxWidth)
            {
                maxWidth = elementWidth;
            }
        });

        elements.forEach(element =>
        {
            element.style.width = `${maxWidth}px`;
        });
    }


    function RunAfterDOMLoaded()
    {
        let observer = new MutationObserver(() =>
        {
            CorrectionOfGrammaticalErrors();
            AddCollapseAllButton();
            FixWidthCommentButtons();
        });

        observer.observe(document.body,
        {
            childList: true,
            subtree: true,
        });
    }

    if (document.readyState === 'loading')
    {
        document.addEventListener('DOMContentLoaded', RunAfterDOMLoaded);
    } else
    {
        RunAfterDOMLoaded();
    }

})();