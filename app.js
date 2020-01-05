fetch('https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@USERNAME')
    .then((res) => res.json())
    .then((data) => {
        // Fillter the array
        const res = data.items //This is an array with the content. No feed, no info about author etc..
        const posts = res.filter(item => item.categories.length > 0) // That's the main trick* !

        function toText(node) {
            let tag = document.createElement('div')
            tag.innerHTML = node
            node = tag.innerText
            return node
        }
        function shortenText(text, startingPoint, maxLength) {
            return text.length > maxLength ?
                text.slice(startingPoint, maxLength) :
                text
        }

        let output = '';
        posts.forEach((item) => {
            output += `
            <div class="card" style="width: 25rem;">
                <img src="${item.thumbnail}" class="card-img-top" alt="...">
                    <div class="card-body">
                        <h5 class="card-title">${shortenText(item.title, 0, 30) + "..."}</h5>
                        <p class="card-text">${'...' + shortenText(toText(item.content), 60, 300) + '...'}</p>
                        <a href="${item.link}" class="btn btn-primary">View Post</a>
                    </div>

                    <div class="card-body text-muted">
                        <span class="blog__author">${item.author}</span>
                        <span class="blog__date">${shortenText(item.pubDate, 0, 10)}</span>
                    </div>
                    
            </div>`
        })

        document.querySelector('.demo').innerHTML= output
        

    })
