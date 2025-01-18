// ==UserScript==
// @name         Interface fixes on myshows.me
// @namespace    http://tampermonkey.net/
// @version      0.11
// @description  Fixing interface styles on myshows.me
// @author       viruseg
// @match        *.myshows.me/*
// @run-at       document-start
// @grant        GM_addStyle
// @icon         https://myshows.me/favicon-32x32.png
// @homepageURL  https://github.com/viruseg/MyShowsInterfaceFix
// @updateURL    https://raw.githubusercontent.com/viruseg/MyShowsInterfaceFix/master/dist/main.js
// @downloadURL  https://raw.githubusercontent.com/viruseg/MyShowsInterfaceFix/master/dist/main.js
// @supportURL   https://github.com/viruseg/MyShowsInterfaceFix/issues
// ==/UserScript==

GM_addStyle(
`
.Unwatched-showTitle-title
{
    font-weight: 500 !important;
}

.Unwatched-season ~ div .UnwatchedEpisodeItem, .RowEpisodeBySeason > .Row-container > div
{
    padding-top: 5px !important;
    padding-bottom: 5px !important;
}

.RowEpisodeBySeason > .Row-container
{
    height: 30px !important;
}

.Comment__actions
{
    border-bottom: 1px solid var(--border-gray-color) !important;
}

.EpisodeWatchLabel
{
    width: 13px !important;
    height: 13px !important;
}

.episodes-by-season__season .MyLabel.corner,
.Unwatched-item .MyLabel.corner
{
    text-align: center !important;
}

.episodes-by-season__season .MyLabel.corner > .MyLabel__wrapper,
.Unwatched-item .MyLabel.corner > .MyLabel__wrapper
{
    border-radius: 2px !important;
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
    color: transparent !important;
    width: 0 !important;
    border: unset !important;
}

.episode-col
{
    font-size: 14px !important;
}

.UnwatchedEpisodeItem__index
{
    width: 16px !important;
    display: flex !important;
    justify-content: flex-end !important;
}

.collapseAll
{
    display: block !important;
    cursor: pointer !important;
    right: 22.7rem !important;
    position: absolute !important;
    color: var(--info-color) !important;
    user-select: none !important;
}

a.episode-col__label:hover
{
    text-decoration: none !important;
}

.TopNavigation__wrapper
{
    gap: 5px !important;
}

.TopNavigation__wrapper button.TopNavigation__link
{
    font-size: 15px !important;
    line-height: 20px !important;
    padding: 5px 8px !important;
}

.Row-container .Col
{
    padding: 4px 0 !important;
}

.episodes-by-season__season .Row-container
{
    padding-left: 20px !important;
}

@media (hover: hover) and (pointer: fine)
{
    .HeaderMenu__item:not(.HeaderMenu__item--disabled):hover .HeaderMenu__dropdown,
    .HeaderMenu__item:not(.HeaderMenu__item--disabled):hover .HeaderMenu__link-wrapper:after
    {
        opacity: 0 !important;
        visibility: hidden !important;
    }
}

.dropDownButton
{
    user-select: none;
    cursor: pointer;
    padding-left: 0.3em;
}

.dropDownButton:hover
{
    color: var(--header-link-hover-color);
}

.dropDownButton[pressed="true"]
{
    color: var(--myshows-color);
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

    function HeaderMenuButtonsFix()
    {
        function HideAll(excludedNode)
        {
            document.querySelectorAll('.HeaderMenu__item .dropDownButton').forEach(dropDownButton =>
            {
                if (excludedNode === dropDownButton) return;
                if (dropDownButton.getAttribute('pressed') === 'true') dropDownButton.onclick();
            });
        }

        document.querySelectorAll('.LayoutWrapper__background, .LayoutWrapper__main').forEach(node =>
        {
            node.addEventListener('mousedown', () => HideAll());
        });

        document.querySelectorAll('.HeaderMenu__item').forEach(item =>
        {
            let wrapper = item.querySelector('.HeaderMenu__link-wrapper');

            if (wrapper.textContent !== 'Сериалы' && wrapper.textContent !== 'Фильмы') return;

            if (item.querySelector('.dropDownButton')) return;

            let dropdown = item.querySelector('.HeaderMenu__dropdown');

            let dropDownButton = document.createElement('div');
            dropDownButton.classList.add('dropDownButton');
            dropDownButton.textContent = '▾';
            dropDownButton.onclick = () =>
            {
                HideAll(dropDownButton);

                if (dropDownButton.getAttribute('pressed') === 'true')
                {
                    dropdown.style.setProperty('opacity', '0', 'important');
                    dropdown.style.setProperty('visibility', 'hidden', 'important');
                    dropDownButton.setAttribute('pressed', 'false');
                }
                else
                {
                    dropdown.style.setProperty('opacity', '1', 'important');
                    dropdown.style.setProperty('visibility', 'visible', 'important');
                    dropDownButton.setAttribute('pressed', 'true');
                }
            };
            wrapper.append(dropDownButton);
        });
    }


    function RunAfterDOMLoaded()
    {
        let observer = new MutationObserver(() =>
        {
            CorrectionOfGrammaticalErrors();
            AddCollapseAllButton();
            FixWidthCommentButtons();
            HeaderMenuButtonsFix();
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