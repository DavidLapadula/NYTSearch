require('dotenv').config();

const axios = require('axios'); 

let key = '?api-key=1cf4863687224e15be90a11d808e7941'; 

const api = {
    // Query NYT API for articles
    getArticles: function (query, beginDate, endDate) {
        console.log(key)
        const URL = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
        return query = axios.get(`${URL}${key}&q=${query}&sort=newest&begin_date=${beginDate}&end_date=${endDate}`);
    },
    // save an article to the db
    saveArticle: function(articleData) {
        return axios.post("/api/articles", articleData)
    },
    // retrieve all saved articles from the db
    getSavedArticles: function() {
        return axios.get("/api/articles");
    },
    // Deletes an article from the db
    deleteArticle: function (id) {
        return axios.delete(`/api/articles/${id}`);

    }
};

export default api;
