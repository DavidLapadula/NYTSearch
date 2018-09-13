require('dotenv').config();

const axios = require('axios'); 

let key = process.env.API_KEY; 

const api = {
    // Query NYT API for articles
    getArticles: function (query, beginDate, endDate) {
        const URL = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
        return axios.get(`${URL}${key}&q=${query}&begin_date=${beginDate}&0101&end_date=${endDate}0101`);
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
        return axios.delete(`/api/saved/${id}`);
    }
};

export default api;
