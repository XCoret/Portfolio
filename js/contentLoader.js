"use strict";

function UnavailableAlert() {
    alert("This project is currently unavailable.");
}

document.addEventListener('DOMContentLoaded', function () {
    // Obtener el elemento principal
    var headerContent = document.getElementById('header');
    var mainContent = document.getElementById('main');
    var footerContent = document.getElementById('footer');
    // Hacer una solicitud para cargar el archivo JSON
    fetch('json/pages.json')
        .then(response => response.json())
        .then(data => {
            // Llamar a la función para cargar la página principal con los datos del JSON
            loadHomePage(data.pages.home);
        })
        .catch(error => console.error('Error loading JSON:', error));

    function loadHomePage(homeData) {
        let nav = document.createElement('nav');
        let contactSection = document.createElement('section');
        contactSection.id = homeData.contact.id;
        // Motto
        let mottoElement = document.createElement('section');
        mottoElement.id = "motto";
        let mottoTitle = document.createElement('h1');
        mottoTitle.innerHTML = homeData.title;
        let mottoDescription = document.createElement('p');
        mottoDescription.innerHTML = homeData.description;

        mottoElement.appendChild(mottoTitle);
        mottoElement.appendChild(mottoDescription);
        mainContent.appendChild(mottoElement);
        // Ini - Sections
        homeData.sections.forEach(section => {
            let sectionLink = document.createElement('a');
            sectionLink.href = "#" + section.id;
            sectionLink.innerHTML = section.id;
            nav.appendChild(sectionLink);

            // Create section element and add the id
            let sectionElement = document.createElement('section');
            sectionElement.id = section.id;
            // Create the section title header and append it to the section element
            let titleElement = document.createElement('h2');
            titleElement.innerHTML = section.title;
            sectionElement.appendChild(titleElement);


            // Apply section specific logic
            let descElement = '';
            switch (section.id) {
                case "about":
                    // Add img
                    let imgElement = document.createElement('img');
                    imgElement.src = "assets/images/" + section.img;
                    sectionElement.appendChild(imgElement);
                    // Add description
                    section.description.forEach(paragraph => {
                        let descElement = document.createElement('p');
                        descElement.innerHTML = paragraph;
                        sectionElement.appendChild(descElement);
                    });
                    break;
                case "portfolio":
                    // Add section description
                    descElement = document.createElement('p');
                    descElement.innerHTML = section.description;
                    sectionElement.appendChild(descElement);
                    // Subsections logic
                    section.subsections.forEach(subsection => {
                        // Create div with subsection ID
                        let subsectionDiv = document.createElement('div');
                        subsectionDiv.id = subsection.id;
                        // Add subsection title and add it to the subsection div
                        let subsectionTitle = document.createElement('h3');
                        subsectionTitle.innerHTML = subsection.title;
                        subsectionDiv.appendChild(subsectionTitle);
                        let subsectionUl = document.createElement('ul');
                        // Items logic
                        subsection.itemList.forEach(item => {
                            // Create a li element for each item
                            let liElement = document.createElement('li');
                            // Add a figure with an image inside
                            let figure = document.createElement('figure');
                            let img = document.createElement('img');
                            img.className = "cover";
                            img.src = "assets/covers/" + item.cover;
                            figure.appendChild(img);
                            liElement.appendChild(figure);
                            // Add the Title with link
                            let div = document.createElement('div');
                            let itemTitle = document.createElement('h4');
                            let link = document.createElement('a');
                            link.href = item.link;
                            link.innerHTML = item.title + " <i class=\"fa-solid fa-link\"></i>";
                            itemTitle.appendChild(link);
                            // Add icon
                            let icon = document.createElement('img');
                            icon.src = "assets/icons/" + item.icon;
                            icon.className = "item-icon";
                            icon.alt = item.alt;
                            icon.title = item.alt;
                            itemTitle.appendChild(icon);
                            div.appendChild(itemTitle);
                            // Add description
                            let desc = document.createElement('p');
                            desc.innerHTML = item.description;
                            // Add all elements to the li and then to the ul
                            div.appendChild(desc);
                            liElement.appendChild(div);
                            subsectionUl.appendChild(liElement);

                        });
                        subsectionDiv.appendChild(subsectionUl);
                        sectionElement.appendChild(subsectionDiv);
                    });
                    break;
                case "resume":
                    // Add section description
                    descElement = document.createElement('p');
                    descElement.innerHTML = section.description;
                    sectionElement.appendChild(descElement);

                    let resumeButtons = document.createElement('div');
                    let resumeFiles = document.createElement('div');
                    let i = 0;
                    section.subsections.forEach(subsection => {
                        let btn = document.createElement('button');
                        btn.className = "tabLink";
                        btn.innerHTML = subsection.button;
                        if (i == 0) {
                            btn.className = "tabLink active";
                        }

                        btn.setAttribute('onClick', "changeTabs(event,'" + subsection.id + "')");
                        resumeButtons.appendChild(btn);


                        // PDF
                        let resumeDiv = document.createElement('div');
                        resumeDiv.id = subsection.id;
                        resumeDiv.className = "tabContent";
                        if (i != 0) {
                            resumeDiv.style.display = "none";
                        }
                        let title = document.createElement('p');
                        title.innerHTML = subsection.description;
                        let iframe = document.createElement('iframe');
                        iframe.src = "assets/resume/" + subsection.downloadable;
                        iframe.title = subsection.title;
                        iframe.id = "pdf"

                        resumeDiv.appendChild(title);
                        resumeDiv.appendChild(iframe);
                        resumeFiles.appendChild(resumeDiv);
                        i++;

                    });
                    sectionElement.appendChild(resumeButtons);
                    sectionElement.appendChild(resumeFiles);
                    break;

                default:
                    break;
            }
            
            mainContent.appendChild(sectionElement);
        });
        let contactNav = document.createElement('a');
        contactNav.href = "#" + homeData.contact.id;
        contactNav.innerHTML = homeData.contact.id;
        nav.appendChild(contactNav);
        headerContent.appendChild(nav);

        let contactTitle = document.createElement('h2');
        contactTitle.innerHTML = homeData.contact.title;
        let contactDesc = document.createElement('p');
        contactDesc.innerHTML = homeData.contact.description;

        contactSection.appendChild(contactTitle);
        contactSection.appendChild(contactDesc);

        let mediaUL = document.createElement('ul');
        mediaUL.id = "media";        
        homeData.contact.links.forEach(link => {
            let li = document.createElement('li');
            let a = document.createElement('a');
            a.href = link.href;

            let icon = document.createElement('i');
            icon.className = link.icon;
            icon.id = link.id;
            let span = document.createElement('span');
            span.innerHTML = link.title;

            a.appendChild(icon);
            a.appendChild(document.createElement('br'));
            a.appendChild(span);
            li.appendChild(a);
            
            mediaUL.appendChild(li);
        });
        contactSection.appendChild(mediaUL);
        footerContent.appendChild(contactSection);
    }
});
function changeTabs(event,language) {
    var i, tabContent,tabLinks;
    tabContent = document.getElementsByClassName("tabContent");
    for (i = 0; i < tabContent.length; i++) {
        tabContent[i].style.display = "none";
    }
    tabLinks = document.getElementsByClassName("tabLink");
    for(i=0;i<tabLinks.length;i++){
        tabLinks[i].className = tabLinks[i].className.replace(" active","");
    }
    document.getElementById(language).style.display = "block";
    event.currentTarget.className += " active";
}