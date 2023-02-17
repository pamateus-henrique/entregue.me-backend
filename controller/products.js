const Product = require('../models/Products');

const getProducts = async (req,res) => {
    const {numericFilters, name, category, fields, sort} = req.query;

    const queryObject = {};

    if(name){
        queryObject.name = name;
    }

    if(category){
        queryObject.category = category;
    }

    //numeric filters
    //regex 'magic' to tranform '</>/<=....' into something moongose will understand
    if (numericFilters) {
        const operatorMap = {
          '>': '$gt',
          '>=': '$gte',
          '=': '$eq',
          '<': '$lt',
          '<=': '$lte',
        };
        const regEx = /\b(<|>|>=|=|<|<=)\b/g;
        let filters = numericFilters.replace(
          regEx,
          (match) => `-${operatorMap[match]}-`
        );
        const options = ['price'];
          filters = filters.split(',').forEach((item) => {
              console.log(`item: ${item}`);
            const [field, operator, value] = item.split('-');
            if (options.includes(field)) {
              queryObject[field] = { [operator]: Number(value) };
            }
        });
      }

      let result = Product.find(queryObject);

      //sort
      if(sort){
        const sortList = sort.split(',').join(' ');
        result = result.sort(sortList);
      } else {
        result = result.sort('createdAt');
      }

      //check if the request only wants a limited set of attributes
      if(fields){
        console.log(fields);
        const fieldsList = fields.split(',').join(' ');
        console.log(fields);
        result = result.select(fieldsList);
      }

      //pagination
      const page = Number(req.query.page) || 1;
      const limit = Number(req.query.limit) || 100;
      const skip = (page - 1) * limit;

      result = result.skip(skip).limit(limit);

      const products = await result;
      res.status(200).json({products, nbHits: products.length});
};

const getSingleProduct = async (req,res, next) => {
    const {id} = req.params;
    if(id.match(/^[0-9a-fA-F]{24}$/)) {
        const queryObject = {};
        queryObject._id = id;
        const product = await Product.find(queryObject);
        res.status(200).json(product);    
    } else {
        console.log('invalid type of ID');
        next();
    }
    
   
}

const insertProduct = async (req,res) => {
    const result = await Product.create(req.body);
    res.status(201).json({result});
}


module.exports = {getProducts, getSingleProduct, insertProduct};