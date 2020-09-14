class Category{
    static all = []

    constructor({id,name}){
        this.id = id
        this.name = name
        this.element = document.createElement('li')
        this.element.id = `category-${id}`
        this.categoryList = document.getElementById('category-list')
        this.sorted = false

        Category.all.push(this)
    }

    static find(id){
        return Category.all.find(c => c.id == id)
    }

    // static findOrCreate(catData){
    //     return this.find(catData.id) ? this.find(catData.id) : new Category(catData)
    // }

    sortedItems(){
        return this.items().sort((a,b) => a.price - b.price )
    }

    // get categoryList(){
    //     return document.getElementById('category-list')
    // }

    fullRender(){
        this.element.innerHTML = `
            <h3>${this.name}</h3>
        `
        return this.element
    }

    items(){
        return Item.all.filter((item) => item.category_id == this.id)
    }

    attachToDom(){
        this.categoryList.append(this.fullRender())
        this.addEventListeners()
    }

    addEventListeners(){
        this.element.addEventListener('click', this.displayItems)
    }

    displayItems = () => {

        currentCategory = this
        const itemList = document.getElementById('item-list')
        itemList.innerHTML = ``
        let items = this.sorted ? this.sortedItems() : this.items()
        items.forEach((i)=>{
            i.attachToDom()
        })
        const sortBtn = document.createElement("button")
        sortBtn.id = `sort-${this.id}`
        sortBtn.textContent = "SORT"
        itemList.append(sortBtn)
        sortBtn.addEventListener('click', (e)=>{
            this.sorted = !this.sorted
            this.displayItems()
        })

    }


}
