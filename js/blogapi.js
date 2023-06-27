document.addEventListener("DOMContentLoaded", function () {
    fetch('//intrepidowlbear.bsite.net/GetTopXPosts/3')
        .then(response => response.json())
        .then(function (data) {
            RenderApiData("blog1", data[0]);
            RenderApiData("blog2", data[1]);
            RenderApiData("blog3", data[2]);
        });

    function RenderApiData(id, data) {
        //Establish the link out to the BlogPost Details...
        let blogLink = `//intrepidowlbear.bsite.net/BlogPosts/UrlFriendly/${data.slug}`;

        //Work with the text anchor
        //let textAnchor = $(`#${id} > div.card-body > h3 > a`);     
        let textAnchor = document.querySelector(`#${id} > div.card-body > h3 > a`);
        textAnchor.text = data.title;
        textAnchor.setAttribute("href", blogLink);

        //Work with the image anchor
        let imageAnchor = document.querySelector(`#${id} > div.card-img > a`);
        imageAnchor.setAttribute("href", blogLink);

        //Work with the image
        let image = document.querySelector(`#${id} > div.card-img > a > img`);
        let imageData = `data:${data.contentType};base64,${data.imageData}`;
        image.setAttribute("src", imageData);

        //Work with the Abstract
        let abstract = document.querySelector(`#${id} > div.card-body > p.card-description`);
        abstract.innerHTML = data.abstract;

        //Work with the created date
        let options = {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        };
        let created = document.querySelector(`#${id} > div.card-footer > div.post-date > span`);
        let localDate = new Date(data.created).toLocaleDateString("en-US", options);
        created.innerHTML = `${localDate}`;
    }
});