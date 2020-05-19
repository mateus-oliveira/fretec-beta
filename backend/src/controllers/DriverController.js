const Driver = require('../models/Driver');

const sendEmailTo = require('../utils/sendEmailTo');

module.exports = {
    async createDriver(req, res){
        const {name, email, phone} = req.body;

        let driver = await Driver.findOne({email});
        
        if (driver){
            return res.status(400).json({erro: "Motorista já foi cadastrado com este email!"})
        }
        
        driver = await Driver.findOne({phone});
        
        if (driver){
            return res.status(400).json({erro: "Motorista já foi cadastrado com este telefone!"})
        }

        const newDriver = await Driver.create({
            name,
            email,
            phone,
        });

        const mailOptions = {
            from: `"Fretec Contato" <${process.env.EMAIL}>`,
            to: email,
            subject: 'Bem vindo ao Fretec',
            text: `Olá, ${name}!\n\nEstamos muito felizes em te ter conosco.\n\nFique atento ao seu email, pois a qualquer momento podem chegar solicitações de fretes, e a ordem de chegada é o critério mais decisivo para se fechar o negócio.\n\nAtenciosamente,\nequipe Fretec.`,
            html: `Olá, ${name}!<br><br>Estamos muito felizes em te ter conosco.<br><br>Fique atento ao seu email, pois a qualquer momento podem chegar solicitações de fretes, e a ordem de chegada é o critério mais decisivo para se fechar o negócio.<br><br>Atenciosamente,<br>equipe Fretec.`
        };

        sendEmailTo(mailOptions);

        return res.json(newDriver);
    },

    async findDriver(req, res){
        const {email} = req.params;
        const driver = await Driver.findOne({email});
        return res.json(driver);
    },

    async findAllDriver(req, res){
        const driver = await Driver.find();
        return res.json(driver);
    },

    async updateDriver(req, res){
        const {id} = req.params;

        const driver = await Driver.findOneAndUpdate(
            {_id: id}, 
            {...req.body}, 
            {new: true},
        )

        return res.json(driver);
    },

    async removeDriver(req, res){
        const {id} = req.params;

        await Driver.findByIdAndDelete(id);
        
        return res.json({'removed': true});
    },
}