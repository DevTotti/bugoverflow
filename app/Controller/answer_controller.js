const mongoose = require('mongoose');
const Answer =  require('../Model/answer_model');


const postAnswer = ((req, res) => {
    const que_id = req.params.id;
    const email = req.email;
    const ans = req.body.answer;
    
    if (!que_id || !email || !ans) {
        return res.json({
            error: true,
            message: 'please fill in the field'
        });
    }

    const answer = new Answer({
        _id: new mongoose.Types.ObjectId,
        que_id: que_id,
        answer: ans,
        user: email
    })
    answer.save()
        .then((data) => {
            res.json({
                error: false,
                message: 'answer saved',
                response: data
            });
        })
        .catch((err) => {
            res.json({
                error: true,
                message: 'an error occured',
                response: err
            });
        });
});



const deleteAnswer = ((req, res) => {
    const email = req.email;
    const ans_id = req.params.id;

    if (!email){
        return res.json({
            error: true,
            message: 'authentication failed'
        });
    }

    Answer.findOneAndDelete({ _id: ans_id, user: email })
        .then((data) => {
            if (data === null) {
                return res.json({
                    error: true,
                    message: 'invalid answer ID or not authorized'
                });
            }
            else{
                res.json({
                    error: false,
                    message: 'answer deleted'
                });
            }
        })
        .catch((err) => {
            res.json({
                error: true,
                message: 'an error occured',
                response: err
            });
        });
});


module.exports = {
    postAnswer,
    deleteAnswer
}