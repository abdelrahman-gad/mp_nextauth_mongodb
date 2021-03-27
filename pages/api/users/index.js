import dbConnect from '../../../utils/dbConnect';
import User from '../../../models/User';

dbConnect();

export default async (req, res) => {
    const { method } = req;

    switch (method) {

        case 'GET':
        
             
            try {
   
                const  user = await User.findOne({'email':req.query.email}); 
                         
                res.status(200).json({ success: true , user })
            } catch (error) {
                res.status(400).json({ success: false });
            }
            break;
        default:
            res.status(400).json({ success: false });
            break;
    }
}