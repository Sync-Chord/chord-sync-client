interface Data {
  name?: string | null;
  uniqueId?: string | null;
  password?: string | null;
  otp?: string | null;
  email?: string | null;
  phone?: string | null;
  age?: number | null;
  gender?: string | null;
}

const email_regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const phone_number_regex = /^[0]?[6789]\d{9}$/;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,10}$/;

const validation = (data: Data) => {
  const error: any = {};

  // name validation
  if (data.name && (data.name.length < 3 || data.name.length > 15)) {
    error["name"] = "Name should be in range 3-15";
  }
   // age validation
  if (data.age && (data.age < 5 || data.age > 100)) {
    error["age"] = "Name should be in range 5-100";
  }
  
   // age validation
   if (data.gender && (data.gender==="MALE" || data.gender ==="male"|| data.gender ==="FEMALE" || data.gender ==="female")) {
    error["gender"] = "gender should be all lowercase or uppercase";
  }

  // email validation
  if (data.email){ 
    if(!email_regex.test(data.email)) {
    error["email"] = "Invalid phone or email";
  }}

  // phone validation
  if (data.phone){
      if(!phone_number_regex.test(data.phone)) {
    error["phone"] = "Invalid phone or email";
  }}

  //email or phone validation
  if (data.uniqueId){ 
    if(!email_regex.test(data.uniqueId)) {
      if(!phone_number_regex.test(data.uniqueId)) {
    error["uniqueId"] = "Invalid phone or email";
  }}}

  // password validation
  if (data.password && (!passwordRegex.test(data.password))) {
    error["password"] = "Password should conatain 1caps,1num";
  }

  // otp validation of 6 numbers
  if (data.otp && !/^\d{6}$/.test(data.otp)) {
    error["otp"] = "OTP should be 6 digits";
  }
  return error;
};

export default validation;
