module.exports = ( function () {

    var css = {

        linkHolder : 'link-holder',
        holderWithMiniature : 'link-holder--miniature',
        holderWithCover : 'link-holder--cover',
        inputElement : 'link-holder__input',
        parsedURLImageMiniatured : 'link-holder__image--miniatured',
        parsedURLImageCovered : 'link-holder__image--covered',
        leftColumnMiniature : 'left-column--miniature',
        leftColumnCover : 'left-column--cover',
        parsedDescription : 'left-column__description',
        link : 'left-column__anchor',
        linkSettings : 'link-settings',
        linkSettingsItem : 'link-settings__item'

    };

    var linkHolder = null;

    function drawInput () {

        var inputElement = document.createElement('INPUT');
        inputElement.type = 'input';
        inputElement.classList.add(css.inputElement);
        inputElement.placeholder = 'Вставьте ссылку';

        return inputElement;

    }

    function drawLinkHolder () {

        var holder = document.createElement('DIV'),
            inputElement = drawInput();

        holder.classList.add(css.linkHolder);
        holder.appendChild(inputElement);

        linkHolder = holder;

        inputElement.addEventListener('paste', callbacks.URLPasted.bind(inputElement));

        return holder;

    }

    function drawEmbedWithStyleOne (data) {

        var holder = document.createDocumentFragment(),
            leftColumn = document.createElement('DIV'),
            title = document.createElement('H3'),
            image = document.createElement('IMG'),
            description = document.createElement('DIV'),
            link = document.createElement('A');

        linkHolder.classList.add(css.holderWithMiniature);

        title.textContent = data.title;

        description.textContent = data.description;
        description.classList.add(css.parsedDescription);

        image.src = data.image;
        image.classList.add(css.parsedURLImageMiniatured);

        link.textContent = data.linkText;
        link.href = data.linkUrl;
        link.classList.add(css.link);

        leftColumn.classList.add(css.leftColumnMiniature);
        leftColumn.appendChild(title);
        leftColumn.appendChild(description);
        leftColumn.appendChild(link);

        holder.appendChild(image);
        holder.appendChild(leftColumn);

        return holder;
    }

    function drawEmbedWithStyleTwo (data) {

        var holder = document.createDocumentFragment(),
            title = document.createElement('H2'),
            leftColumn = document.createElement('DIV'),
            image = document.createElement('IMG'),
            description = document.createElement('DIV'),
            link = document.createElement('A');

        linkHolder.classList.add(css.holderWithCover);

        title.textContent = data.title;

        description.textContent = data.description;
        description.classList.add(css.parsedDescription);

        image.src = data.image;
        image.classList.add(css.parsedURLImageCovered);

        link.textContent = data.linkText;
        link.href = data.linkUrl;

        leftColumn.classList.add(css.leftColumnCover);
        leftColumn.appendChild(title);
        leftColumn.appendChild(description);
        leftColumn.appendChild(link);

        holder.appendChild(image);
        holder.appendChild(leftColumn);

        return holder;

    }

    function drawSettingsHolder () {

        var holder = document.createElement('DIV');
        holder.classList.add(css.linkSettings);
        return holder;

    }

    function drawSettingsItem (itemTypes, item) {

        var settingsItem = document.createElement('SPAN');
        settingsItem.textContent = itemTypes[item];
        settingsItem.classList.add(css.linkSettingsItem);

        return settingsItem;

    }

    return {
        linkHolder,
        drawInput,
        drawLinkHolder,
        drawEmbedWithStyleOne,
        drawEmbedWithStyleTwo,
        drawSettingsHolder,
        drawSettingsItem
    }


})();

var callbacks = require('./callbacks');