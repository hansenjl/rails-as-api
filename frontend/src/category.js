class Category{
    static all = []

    constructor({id,name}){
        this.id = id
        this.name = name
        this.element = document.createElement('li')
        this.element.id = `category-${id}`
        this.categoryList = document.getElementById('category-list')

        Category.all.push(this)
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
        document.getElementById('item-list').innerHTML = ``
        this.items().forEach((i)=>{
            i.attachToDom()
        })
    }

}
