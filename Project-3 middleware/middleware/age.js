const checkage=(req,res,next)=>{
    const age=req.query.age;
    if(age>=18){
        next();
    }else{
        return res.redirect('/');
    }
}
module.exports=checkage;