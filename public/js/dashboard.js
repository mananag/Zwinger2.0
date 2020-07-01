
    let petItem = document.getElementsByClassName('expand');
    let i;

    for (i = 0; i < petItem.length; i++) {
        petItem[i].addEventListener("click", function () {
            console.log(this.style)
            this.style.transform = "rotate(0deg)"
            let content = this.nextElementSibling;
            if (content.style.maxHeight){
                content.style.maxHeight = null;
                content.style.padding = "0px"
            } else {
                this.style.transform = "rotate(-90deg)"
                content.style.maxHeight = (content.scrollHeight + 100).toString();
                content.style.padding = "15px"
            }
        })
    }
