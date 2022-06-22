//dışardan gelen değere bakıcak. admin veya teacher gelirse devam eder kurs oluşturabilir. yetkisi yoksa hata verir 
module.exports = (roles) => {  
  //rolün ne olduğuna bakacağız öncelikle
  return async (req, res, next) => {
    const userRole = await req.body.role; //register alanında ki selectin name değeri (name='role')
    if (roles.includes(userRole)) {
      next();
    } else {
      return res.status(401).send("Bu işleme yetkiniz yok");
    }
  };
};
