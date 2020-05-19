const Request = require('../models/Request');
const Driver = require('../models/Driver');

const sendEmailTo = require('../utils/sendEmailTo');

module.exports = {
    async createRequest(req, res){
        const {name, email, phone, address, description} = req.body;

        const request = await Request.create({
            name,
            email,
            phone,
            description,
            address,
        });

        // const drivers =  await Driver.find({
        //     location: { 
        //         $near: {
        //             $geometry: { type: "Point",  coordinates: [ -73.9667, 40.78 ] },
        //             $minDistance: 1000,
        //             $maxDistance: 5000,
        //         }
        //     }
        // });

        const drivers = await Driver.find();

        const url = `https://www.google.com.br/maps/place/${encodeURI(address.street)}+${encodeURI(address.number)}+${encodeURI(address.district)}+${encodeURI(address.city)}`;

        for (let i in drivers){
            let message = `Olá ${name}, me chamo ${drivers[i].name} e desejo realizar a entrega com descrição: *${description}*`;
            let mailOptions = {
                from: `"Fretec Contato" <${process.env.EMAIL}>`,
                to: drivers[i].email,
                subject: 'Nova viagem!',
                text: `Olá, ${drivers[i].name}!\n\nUma nova viagem foi solicitada por ${name} em:\n\n${url}\n\nResponda o mais rápido no que puder no WhatsApp do cliente para fechar o negócio.\n\nFique atento ao seu email, pois a qualquer momento podem chegar solicitações de fretes, e a ordem de chegada é o critério mais decisivo para se fechar o negócio.\n\nAtenciosamente,\nequipe Fretec.`,
                html: `
                <html>
                    <head/>
                    <body>
                        Olá, ${drivers[i].name}!<br/><br/>Uma nova viagem foi solicitada por ${name} em:<br/><br/>${url}<br><br>Responda o mais rápido no que puder no WhatsApp do cliente para fechar o negócio: <a href="https://wa.me/55${encodeURI(phone)}?text=${encodeURI(message)}">Clique aqui</a>.<br/><br/>Fique atento ao seu email, pois a qualquer momento podem chegar solicitações de fretes, e a ordem de chegada é o critério mais decisivo para se fechar o negócio.<br><br>Atenciosamente,<br>equipe Fretec.
                    </body>
                </html>`
            };
    
            sendEmailTo(mailOptions);
        }

        return res.json(request);
    },

    async findRequest(req, res){
        const {id} = req.params;
        const request = await Request.findById(id);
        return res.json(request);
    },

    async findAllRequest(req, res){
        const request = await Request.find();
        return res.json(request);
    },

    async updateRequest(req, res){
        const {id} = req.params;

        const request = await Request.findOneAndUpdate(
            {_id: id}, 
            {...req.body}, 
            {new: true},
        )

        return res.json(request);
    },

    async removeRequest(req, res){
        const {id} = req.params;

        await Request.findByIdAndDelete(id);
        
        return res.json({'removed': true});
    },
}