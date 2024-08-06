interface Data {
  name?: string | null;
  uniqueId?: string | null;
  password?: string | null;
  otp?: string | null;
}

const email_regex = /^[a-z0-9]+@[a-z]+\.[a-z]{2,3}$/;
//  /^(\+91|\+91\-|0)?[789]\d{9}$/  
//  /^(\+?\d{1,2}\s?)?(\(?\d{3}\)?[\s.-]?)?\d{3}[\s.-]?\d{4}$/
const phone_number_regex = /^[0]?[6789]\d{9}$/;// only 10 digit number
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,10}$/;

const validation = (data: Data) => {
  const error: any = {};

  // name validation
  if (data.name && (data.name.length < 3 || data.name.length > 15)) {
    error["name"] = "Name should be in range 3-15";
  }

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
