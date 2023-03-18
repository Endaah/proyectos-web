let alignments = ['blank', 'light', 'dark'];

function setAlig(id, alig) {
    var flower, link;

    flower = document.getElementById("flower" + id);
    link = document.getElementById("link" + id);

    alignments.forEach(str => {
        if (flower.classList.contains(str))
            flower.classList.remove(str);
        if (link.classList.contains(str))
            link.classList.remove(str);
    });

    flower.classList.add(alig);
    link.classList.add(alig);
}