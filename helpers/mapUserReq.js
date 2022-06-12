module.exports = function (userData, user) {
  if (userData.username)
    user.username = userData.username;
  if (userData.password)
    user.password = userData.password;
  if (userData.name)
    user.name = userData.name;
  if (userData.email)
    user.email = userData.email;
  if (userData.phoneNumber)
    user.phoneNumber = userData.phoneNumber;
  if (userData.gender)
    user.gender = userData.gender;
  if (userData.dob)
    user.dob = userData.dob;
  if (userData.isMarried)
    user.isMarried = userData.isMarried;
  if (!user.address)
    user.address = {}; // if initilize empty {} it will erase all data of address
  if (userData.tempAddr)
    user.address.temporaryAddress = userData.tempAddr.split(',');
  if (userData.permanentAddr)
    user.address.permanentAddress = userData.permanentAddr;
  if (userData.role)
    user.role = userData.role;
  if (userData.status)
    user.status = userData.status;
  if (userData.nationality)
    user.nationality = userData.nationality;
  if (userData.image)
    user.image = userData.image;
  return user;
}
