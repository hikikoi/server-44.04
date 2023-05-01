import { read, hashPassword } from '../utils/model.js';

export default {
  GET: (req, res) => {
    const admins = read('admin');
    admins.filter(a => delete a.password)
    res.json(200, admins);
  },

  POST: async (req, res) => {
    let {username, password} = await req.body;
    const admins = read('admin');
    password = hashPassword(password);
    try {
        let admin = admins.filter(a => a.username == username && a.password == password);
        if(admin.length == 0) {
            throw new Error('Invalid username or password...')
        }
        res.json(200, {status: 200, message: "successfully signed in!"});
    } catch (error) {
        res.json(400, {status: 400, message: error.message});
    }
  }
};