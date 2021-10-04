app.get("/", (req, res) => {
  res.send('<h1>Home Page</h1><a href="/api/products">products</a>')
});
app.get('/api/products',(req,res) => {
  const newProducts = products.map((product) => {
    const {id, name , image} = product
    return {id, name, image}
  })
  res.json(newProducts)
})
app.get('/api/products/:productID',(req,res) => {
  const {productID} = req.params
  const singleProduct = products.find((product) => { return product.id === Number(productID)}) //返回找到的第一项
  if (!singleProduct) {
    res.status(404).send('Product has not Exist')
  }
  res.json(singleProduct)
})
app.get('/api/products/:productID/reviews/:reviewID',(req,res) => {
  console.log(req.params)
})
app.get('/api/v1/query',(req,res) => {
  const {search, limit} = req.query
  let sortProducts = [...products] // 复制数组
  if (search) {
    sortProducts = sortProducts.filter((product) => {
      return product.name.startsWith(search)
    })
  }
  if (limit) {
    sortProducts = sortProducts.slice(0, Number(limit))
  }
  res.status(200).json(sortProducts)
})