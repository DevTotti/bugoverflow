const mongoose = require('mongoose');
const Question = require('../Model/stack_model');
const Answer =  require('../Model/answer_model');


const postQuestion = ((req, res) => {
    const user = req.email;
    const title = req.body.title;
    const tags = req.body.tags;
    const body = req.body.body;

    if (!user) {
        return res.json({
            error: true,
            message: 'authentication failed!'
        });
    }

    if (!title || !tags || !body){
        return res.json({
            error: true,
            message: 'ensure you fill required fields!'
        })
    }

    try {
        const newQuestion = new Question({
            _id: new mongoose.Types.ObjectId,
            title: title,
            body: body,
            tags: tags,
            user: user,
            upvote: req.body.upvote,
            downvote: req.body.downvote
        });
        newQuestion.save()
            .then((data) => {
                res.json({
                    error: false,
                    message: 'question saved succesfully!',
                    response: data
                });
            })
            .catch((err) => {
                res.json({
                    error: true,
                    message: 'an error occured!',
                    response: err
                });
            });
    }
    catch (err) {
        return res.json({
            error: true,
            message: 'an error occured',
            reponse: err
        });
    }
});


const getQuestions = ((req, res) => {
    Question.find()
        .then((data) => {
            res.json({
                error: false,
                message: 'questions fetched successfully!',
                response: data
            });
        })
        .catch((err) => {
            res.json({
                error: true,
                message: 'error fetching data!',
                response: err
            });
        });
});


const getQuestion = ((req, res) => {
    const id = req.params.id;
    if (!id){   
        return res.json({
            error: true,
            message: 'please pass in ID'
        });
    }

    Question.findById(id)
        .then((data) => {
            const que_id = data._id;
            Answer.find({que_id: que_id}) 
                .then((result) => {
                    if (result.length === 0) {
                        res.json({
                            error: false,
                            message: 'question data fetched!',
                            response: data,
                            answers: 'No answer Yet'
                        });
                    }
                    else {
                        res.json({
                            error: false,
                            message: 'question fetched!',
                            response: data,
                            answers: result
                        });
                    }
                })
                .catch((err) => {
                    res.json({
                        error: false,
                        message: 'question fetched!',
                        response: data
                    });
                });

        })
        .catch((err) => {
            res.json({
                error: true,
                message: 'error fetching data',
                response: err
            });
        });
});


const deleteQuestion = ((req, res) => {
    const id = req.params.id;
    const email = req.email;
    if (!id){   
        return res.json({
            error: true,
            message: 'please pass in ID'
        });
    }
    if (!email){   
        return res.json({
            error: true,
            message: 'authentication failed!'
        });
    }
    Question.findOneAndDelete({_id: id, user: email})
        .then((data) => {
            res.json({
                error: false,
                message: 'question data deleted!',
                response: data
            });
        })
        .catch((err) => {
            res.json({
                error: true,
                message: 'unable to delete data',
                res: err
            });
        });
});


module.exports = {
    postQuestion,
    getQuestions,
    getQuestion,
    deleteQuestion
}