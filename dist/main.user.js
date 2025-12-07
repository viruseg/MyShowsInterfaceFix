// ==UserScript==
// @name         Interface fixes on myshows.me
// @namespace    http://tampermonkey.net/
// @version      0.28
// @description  Fixing interface styles on myshows.me
// @author       viruseg
// @match        *.myshows.me/*
// @run-at       document-start
// @grant        GM_addStyle
// @icon         https://myshows.me/favicon-32x32.png
// @homepageURL  https://github.com/viruseg/MyShowsInterfaceFix
// @updateURL    https://raw.githubusercontent.com/viruseg/MyShowsInterfaceFix/master/dist/main.user.js
// @downloadURL  https://raw.githubusercontent.com/viruseg/MyShowsInterfaceFix/master/dist/main.user.js
// @supportURL   https://github.com/viruseg/MyShowsInterfaceFix/issues
// ==/UserScript==

GM_addStyle(
`
.Unwatched__show-title,
.Unwatched-showTitle-title,
.UnwatchedShows__show-title
{
    font-weight: 500 !important;
}

.Unwatched__season ~ div .UnwatchedEpisodeItem,
.Unwatched-season ~ div .UnwatchedEpisodeItem,
 .RowEpisodeBySeason > .Row-container > div
{
    padding-top: 5px !important;
    padding-bottom: 5px !important;
}

.RowEpisodeBySeason > .Row-container,
.EpisodesBySeason__season .RowEpisodeBySeason
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

.Unwatched__item .MyLabel.corner,
.EpisodesBySeason__season .MyLabel.corner,
.Unwatched-item .MyLabel.corner
{
    text-align: center !important;
}

.Unwatched__item .MyLabel.corner > .MyLabel__wrapper,
.EpisodesBySeason__season .MyLabel.corner > .MyLabel__wrapper,
.Unwatched-item .MyLabel.corner > .MyLabel__wrapper
{
    border-radius: 2px !important;
    background-color: var(--color-gray-170) !important;
}

.dark-mode .Unwatched__item .MyLabel.corner > .MyLabel__wrapper,
.dark-mode .EpisodesBySeason__season .MyLabel.corner > .MyLabel__wrapper,
.dark-mode .Unwatched-item .MyLabel.corner > .MyLabel__wrapper
{
    background-color: var(--comments-label-color) !important;
}

.Unwatched__item .MyLabel.corner > .MyLabel__wrapper > .MyLabel__corner,
.EpisodesBySeason__season .MyLabel.corner > .MyLabel__wrapper > .MyLabel__corner,
.Unwatched-item .MyLabel.corner > .MyLabel__wrapper > .MyLabel__corner,
.Sidebar__item-before .MyLabel.corner > .MyLabel__wrapper > .MyLabel__corner
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

.EpisodesBySeason__season .Row-container
{
    padding-right: 20px !important;
}

.EpisodesBySeason__season .Col.RowEpisodeBySeason__number
{
    display: flex !important;
    justify-content: flex-end !important;
    margin-right: 10px !important;
}

@media (hover: hover) and (pointer: fine)
{
    .HeaderMenu__item:not(.HeaderMenu__item--disabled):hover .HeaderMenuDropdown,
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

.WatchSoon .WatchSoon-dateHidden > a
{
    display: none !important;
}

.WatchSoon .WatchSoon__title-wrapper
{
    flex-direction: row !important;
    align-items: center !important;
    gap: 10px !important;
}

.WatchSoon .WatchSoon__title-wrapper > a
{
    font-size: var(--main-font-size) !important;
}

.WatchSoon .WatchSoon-episode
{
    margin-top: 0 !important;
}

.WatchSoon .WatchSoon-date > a
{
    display: flex;
    font-weight: 400;
    font-size: var(--main-font-size);
}

.WatchSoon .WatchSoon-date > a div:first-child:after
{
    content: ',';
    margin-right: 5px;
}

.WatchSoon .WatchSoon-episodes .Row
{
    padding-left: 10px;
}

.WatchSoon .Row-container .Col:first-child
{
    max-width: 40px !important;
}

.WatchSoon .WatchSoon-header .Row-container .Col:first-child
{
    max-width: unset !important;
}

.ProfileNewComments__section .com-comments .MyLabel
{
    width: 100%;
}

.ProfileNav-item:has(.newCommentUrl:hover)
{
    text-decoration: none;
}

.ProfileNav-item .newCommentUrl:hover .MyLabel.corner > .MyLabel__wrapper
{
    text-decoration: underline;
}
`);

(function()
{
    'use strict';

    function CorrectionOfGrammaticalErrors()
    {
        let wordsToReplace = ['Смотрящих', 'Смотрящий', 'Смотрящие', 'смотрящих', 'смотрящий', 'смотрящие', 'Смотрят', 'смотрят', 'Посмотрели', 'посмотрели'];
        let replacementWords = ['Зрителей', 'Зритель', 'Зрители', 'зрителей', 'зритель', 'зрители', 'Зрители', 'зрители', 'Зрители', 'зрители'];

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

        function ReplaceText(textNode)
        {
            if (textNode == null || textNode.nodeType !== Node.TEXT_NODE) return;

            for (let j = 0; j < regExps.length; j++)
            {
                if (textNode.textContent.search(regExps[j]) === -1) continue;

                textNode.textContent = textNode.textContent.replace(regExps[j], replacementWords[j]);
                break;
            }
        }

        function Replace(node)
        {
            if (node == null) return;

            for (let i = 0; i < node.childNodes.length; i++)
            {
                let childNode = node.childNodes[i];

                if (childNode.nodeType === Node.ELEMENT_NODE)
                {
                    Replace(childNode);
                    continue;
                }

                if (childNode.nodeType === Node.TEXT_NODE)
                {
                    ReplaceText(childNode);
                    continue;
                }
            }
        }

        function ReplaceInArray(nodeArray)
        {
            if (nodeArray == null) return;

            for (let i = 0; i < nodeArray.length; i++)
            {
                let node = nodeArray[i];

                if (node.nodeType === Node.ELEMENT_NODE)
                {
                    Replace(node);
                    continue;
                }

                if (node.nodeType === Node.TEXT_NODE)
                {
                    ReplaceText(node);
                    continue;
                }
            }
        }

        ReplaceInArray(document.querySelectorAll('.info-row__title'));
        ReplaceInArray(document.querySelectorAll('.ShowsTable .Row.title .Row-container .Col'));
        ReplaceInArray(document.querySelectorAll('.Filters .SearchFilter .SearchFilter__title'));
        Replace(document.querySelector('.SortPanel button.SortPanel__button:last-child')?.firstChild);
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

    let watchingSectionIsClosed = false;

    function HidingTheWatchingSection()
    {
        if (new URL(window.location.href).pathname !== '/profile/')
        {
            watchingSectionIsClosed = false;
            return;
        }

        if (watchingSectionIsClosed) return;

        let subMenu = document.querySelector('.Page .Page__aside .mb-4');

        if (subMenu === null) return;

        let list = subMenu.querySelector('.List');

        if (list === null) return;

        {
            let observer = new MutationObserver((mutationsList) =>
            {
                for (let mutation of mutationsList)
                {
                    if (mutation.type === 'childList')
                    {
                        mutation.removedNodes.forEach((node) =>
                        {
                            if (node === list) watchingSectionIsClosed = true;
                        });
                    }
                }
            });

            let config = { childList: true };
            observer.observe(subMenu, config);
        }

        let asideHeading = subMenu.querySelector('.AsideHeading');

        if (asideHeading === null) return;

        if (list.childElementCount === 0)
        {
            watchingSectionIsClosed = true;
            return;
        }

        asideHeading.click();
    }

    function FixWidthCommentButtons()
    {
        const elements = document.querySelectorAll('.EpisodesBySeason__season .MyLabel.corner, .Unwatched-item .MyLabel.corner');

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

            let textContent = wrapper.querySelector('a').textContent;
            if (textContent !== 'Сериалы' && textContent !== 'Фильмы') return;

            let dropDownButton = item.querySelector('.dropDownButton');

            if (!dropDownButton)
            {
                dropDownButton = document.createElement('div');
                dropDownButton.classList.add('dropDownButton');
                dropDownButton.textContent = '▾';
                wrapper.append(dropDownButton);
            }

            let dropdown = item.querySelector('.HeaderMenuDropdown');

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
        });
    }

    let cachedWatchSoon = null;
    let cachedWatchSoonHash = 0;

    function CalendarFix()
    {
        if (new URL(window.location.href).pathname !== '/profile/next/') return;

        let watchSoon = document.querySelector('.WatchSoon');
        let hasCache = watchSoon?.getAttribute('hasCache') === 'true';

        if (hasCache)
        {
            if (StrHash(watchSoon.innerHTML) !== cachedWatchSoonHash)
            {
                watchSoon.replaceWith(cachedWatchSoon.cloneNode(true));

                let watchSoonItems = Array.from(document.querySelectorAll('.WatchSoon > .WatchSoon-item'));

                watchSoonItems.forEach(watchSoonItem =>
                {
                    let header = watchSoonItem.querySelector('.WatchSoon-header');
                    let episodes = watchSoonItem.querySelector('.WatchSoon-episodes');

                    header.addEventListener('click', () =>
                    {
                        if (episodes.style.getPropertyValue('display') === 'none')
                        {
                            episodes.style.setProperty('display', 'block');
                            episodes.style.setProperty('height', 'auto');
                        }
                        else
                        {
                            episodes.style.setProperty('display', 'none');
                            episodes.style.setProperty('height', '0');
                        }
                    });
                });
            }
        }
        else
        {
            let watchSoonItems = Array.from(document.querySelectorAll('.WatchSoon > .WatchSoon-item'));

            watchSoonItems.forEach(watchSoonItem => SortLines(watchSoonItem));

            watchSoon.setAttribute('hasCache', 'true');
            cachedWatchSoon = watchSoon.cloneNode(true);
            cachedWatchSoonHash = StrHash(cachedWatchSoon.innerHTML);
        }

        function SortLines(watchSoonItem)
        {
            let rows = Array.from(watchSoonItem.querySelectorAll('.WatchSoon-episodes .Row'));

            if (rows.length === 0) return;

            for (let i = 1; i < rows.length; i++)
            {
                let row = rows[i];
                let rowPrev = rows[i - 1];
                let date = row.querySelector('.WatchSoon-date');
                let datePrev = rowPrev.querySelector('.WatchSoon-date');

                if (date.textContent === '' && datePrev.textContent !== '') date.replaceWith(datePrev.cloneNode(true));
            }

            rows.sort((a, b) =>
            {
                return CompareRows(a, b);
            });

            let parent = rows[0].parentElement;
            rows.forEach(wrapper => parent.appendChild(wrapper));

            for (let i = 1; i < rows.length; i++)
            {
                let row = rows[i];
                let rowPrev = rows[i - 1];
                let date = row.querySelector('.WatchSoon-date');
                let datePrev = rowPrev.querySelector('.WatchSoon-date');

                if (date.textContent === datePrev.textContent) date.classList.add('WatchSoon-dateHidden');
            }

            for (let i = 0; i < rows.length; i++)
            {
                let row = rows[i];
                let episode = row.querySelector('.WatchSoon-episode');
                let seasonNum = episode.childNodes[0].textContent;
                let episodeNum = episode.childNodes[2].textContent;
                let episodeName = episode.childNodes[3].textContent;
                episodeName = episodeName.replace('-', '—');

                if (seasonNum.length === 1) seasonNum = '0' + seasonNum;
                if (episodeNum.length === 1) episodeNum = '0' + episodeNum;

                while (episode.firstChild)
                {
                    episode.removeChild(episode.firstChild);
                }

                episode.textContent = 's' + seasonNum + 'e' + episodeNum + episodeName;
            }

            function CompareRows(a, b)
            {
                let aDate = a.querySelector('.WatchSoon-date > a').getAttribute('href');
                let bDate = b.querySelector('.WatchSoon-date > a').getAttribute('href');

                if (aDate > bDate) return 1;
                if (aDate < bDate) return -1;

                let aShow = a.querySelector('.WatchSoon__title-wrapper .WatchSoon-show').textContent.trim();
                let bShow = b.querySelector('.WatchSoon__title-wrapper .WatchSoon-show').textContent.trim();

                if (aShow > bShow) return 1;
                if (aShow < bShow) return -1;

                let aEpisode = a.querySelector('.WatchSoon__title-wrapper .WatchSoon-episode').textContent.trim();
                let bEpisode = b.querySelector('.WatchSoon__title-wrapper .WatchSoon-episode').textContent.trim();

                if (aEpisode > bEpisode) return 1;
                if (aEpisode < bEpisode) return -1;

                return 0;
            }
        }

        function StrHash(str, seed = 0)
        {
            let h1 = 0xdeadbeef ^ seed, h2 = 0x41c6ce57 ^ seed;
            for (let i = 0, ch; i < str.length; i++)
            {
                ch = str.charCodeAt(i);
                h1 = Math.imul(h1 ^ ch, 2654435761);
                h2 = Math.imul(h2 ^ ch, 1597334677);
            }
            h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507);
            h1 ^= Math.imul(h2 ^ (h2 >>> 13), 3266489909);
            h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507);
            h2 ^= Math.imul(h1 ^ (h1 >>> 13), 3266489909);

            return 4294967296 * (2097151 & h2) + (h1 >>> 0);
        }
    }

    function ProfileNavCommentsFix()
    {
        let nickname = document.querySelector('.HeaderLogin__dropdown > a')?.getAttribute('href');

        if (nickname == null) return;

        let commentsLine = document.querySelector('.ProfileNav > .ProfileNav-item[href="/profile/comments/"]');

        if (commentsLine == null) return;

        commentsLine.classList.add('commentUrl');
        commentsLine.href = nickname + '/comments/';

        let newCommentsNode = commentsLine.querySelector('.MyLabel.corner');

        if (newCommentsNode != null)
        {
            let newCommentsUrlNode = document.createElement('a');
            newCommentsUrlNode.classList.add('newCommentUrl');
            newCommentsUrlNode.href = '/profile/comments/';
            newCommentsUrlNode.append(newCommentsNode.cloneNode(true));

            newCommentsNode.replaceWith(newCommentsUrlNode);
        }

        commentsLine.replaceWith(commentsLine.cloneNode(true));
    }


    function RunAfterDOMLoaded()
    {
        let observer = new MutationObserver(() =>
        {
            CorrectionOfGrammaticalErrors();
            AddCollapseAllButton();
            HidingTheWatchingSection();
            FixWidthCommentButtons();
            HeaderMenuButtonsFix();
            CalendarFix();
            ProfileNavCommentsFix();
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