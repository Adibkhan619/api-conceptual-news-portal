const loadCategory = async () => {
    const response = await fetch("https://openapi.programming-hero.com/api/news/categories");
    const data = await response.json();
    console.log(data);

    const categoryContainer = document.getElementById('category-container-bar');
    data.data.news_category.forEach((item) => {

        const div = document.createElement("div");

        div.innerHTML = `<button onclick="loadNews('${item.category_id}')">${item.category_name}</button>`;

        categoryContainer.appendChild(div);


    })
}
loadCategory();

const loadNews = async (catId) => {

    document.getElementById('loading-spinner').style.display='block';

    const response = await fetch(`https://openapi.programming-hero.com/api/news/category/${catId}`);
    const data = await response.json();
    console.log('singleNews:', data)

    

    const singleNews = document.getElementById('single-news');
    singleNews.innerHTML = '';

    data.data.forEach((item) => {

        document.getElementById('loading-spinner').style.display='none';

        const div = document.createElement('div');
        div.innerHTML = `
        <div class="news-photo">
                <img src="${item.image_url}" alt="">
            </div>               
            <div class="news-info">
                <h2 class="news-title"> ${item.title}</h2>
                <p>${item.details.slice(0, 300)}</p>
            </div>
        `
        singleNews.appendChild(div);
        div.classList.add('flex', 'gap-10', 'p-10', 'shadow-md')
    })
}
loadNews("01");


const search = () => {
    const value = document.getElementById('search-box').value;

    if(value){
        loadNews(value);
    }
    else{
        alert('Enter an ID');
    }

}