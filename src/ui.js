module.exports = ( function () {

    var css = {

        linkHolder : 'link-holder',
        inputElement : 'link-holder__input',
        parsedURLImage : 'link-holder__image',
        leftColumn : 'left-column',
        parsedDescription : 'left-column__desciption',
        link : 'left-column__anchor'

    };

    function drawInput () {

        var inputElement = document.createElement('INPUT');
        inputElement.type = 'input';
        inputElement.classList.add(css.inputElement);

        return inputElement;

    }

    function drawLinkHolder () {

        var holder = document.createElement('DIV'),
            inputElement = drawInput();

        holder.classList.add(css.linkHolder);
        holder.appendChild(inputElement);

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

        title.textContent = data.title;

        description.textContent = data.description;
        description.classList.add(css.parsedDescription);

        image.src = data.image;
        image.classList.add(css.parsedURLImage);

        link.textContent = data.linkText;
        link.href = data.linkUrl;
        link.classList.add(css.link);

        leftColumn.classList.add(css.leftColumn);
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
            image = document.createElement('IMG'),
            description = document.createElement('DIV'),
            link = document.createElement('A');

        title.textContent = data.title;

        description.textContent = data.description;

        image.src = data.image;
        image.classList.add(css.parsedURLImage);

        link.textContent = data.linkText;
        link.href = data.linkUrl;

        holder.appendChild(image);
        holder.appendChild(title);
        holder.appendChild(description);
        holder.appendChild(link);

        return holder;

    }

    return {
        drawInput,
        drawLinkHolder,
        drawEmbedWithStyleOne
    }


})();

var callbacks = require('./callbacks');