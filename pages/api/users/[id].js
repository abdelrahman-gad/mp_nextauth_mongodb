import dbConnect from '../../../utils/dbConnect';
import User from '../../../models/User';

dbConnect();

export default async (req, res) => {
    const {
        query: { id },
        method
    } = req;

    switch (method) {
       
        case 'PUT':
            try {
                 const id = req.body._id;
                const user = await User.findByIdAndUpdate(id, req.body , {
                    new: true,
                    // runValidators: true
                    // ,
                    // useFindAndModify:false
                });

                console.log(user); 
                if (!user) {
                    return res.status(400).json({ success: false });
                }

                res.status(200).json({ success: true, data: user });

            } catch (error) {
                console.log(error);
                res.status(400).json({ success: false });
            }
            break;
        default:
            res.status(400).json({ success: false })
            break;
    }
}