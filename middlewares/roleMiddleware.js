//dışardan gelen değere bakıcak. admin veya teacher gelirse devam eder kurs oluşturabilir. yetkisi yoksa hata verir 
module.exports = (roles) => {  
  //rolün ne olduğuna bakacağız öncelikle
  return (req, res, next) => {
    const userRole = req.body.role; //register alanında ki selectin name değeri (name='role')
    
    if (roles.includes(userRole)) {
      next();
    } else {
      return res.status(401).send("Bu işleme yetkiniz yok");
    }
  };
};
