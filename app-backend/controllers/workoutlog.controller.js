// Retrieve all Tutorials from the database.
// exports.findAll =  (Model) => {
//   console.log(Model)
//     return async (req, res) => {
//     console.log("inside .findAll()")
//     try {
//       const items =  await Model.find();
//       console.log("Items fetched:", items);
//       res.json(items); 
//     }
//     catch (error) {
//       console.error('Error fetching Exercises:', error);
//       res.status(500).json({ error: 'Failed to fetch Exercises' });
//     }
//   }
// };

// Retrieve all Tutorials from the database.
exports.findAll = (Model) => {
  console.log("before async in controller.findall()")
  return async (req, res) => {
    console.log("after async")
    try {
      const items = await Model.find(); // Corrected method
      res.json(items); 
    } catch (error) {
      console.error('Error fetching items:', error);
      res.status(500).json({ error: 'Failed to fetch items' });
    }
  };
};

// Find a single Tutorial with an id
exports.findOne = (Model) => {
  return async (req, res) => {
    console.log("inside .findOne('/user/:id'...)");
    try {
      const { id } = req.params;
      console.log(`get user id: ${req.params.id}`)
      const item = await Model.findById(id);
      res.status(200).json(item);
    } catch (error) {
      console.error('Error fetching item:', error);
      res.status(500).json({ error: 'Failed to fetch' });
    }
  }
};

// Update a Tutorial by the id in the request
exports.update = (req, res) => {
  
};

// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {
  
};

// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {
  
};

// Find all published Tutorials
exports.findAllPublished = (req, res) => {
  
};



/**
 * copy from user routesoperations
 */
// router.route("/:id")
//   .get((req,res)=>{
//     res.send(`Get User with ID: ${req.params.id}`)
//   }).post((req,res)=>{
//     res.send('Create User')
//   })
//   .put((req,res)=>{
//     res.send(`Put User with ID: ${req.params.id}`)
//   })
//   .delete(async (req,res)=>{
//     console.log("delete user by id")
//     try {
//       const { id, username } = req.params;
//       const deletedUser = await User.findByIdAndDelete(id);

//       if (!deletedUser) {
//         return res.status(404).json({ error: 'User not found' });
//       }

//       res.status(200).json({ message: `User: ${deletedUser.fname} id: ${id} deleted successfully` });
//     }
//     catch(err){
//       console.log("delete user err ", err);
//     }
//   });