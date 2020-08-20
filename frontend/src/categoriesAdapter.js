class CategoriesAdapter{
    constructor(){
        this.baseUrl = "http://localhost:3000/categories"
    }

    // GET
    fetchCategories(){
        fetch(this.baseUrl)
        .then(res => res.json())
        .then(json => {
            json.data.forEach((el)=>{
                this.sanitizeAndInitializeCategory(el)
            })
        })

    }

    sanitizeAndInitializeCategory(resp){
        let cat = new Category({id: resp.id, ...resp.attributes})
        cat.attachToDom()
    }
}