import { required, yup } from "./CommonValidation";
import * as Yup from 'yup';
export const UserSchema = (type) => { 
    if (type === 'user') {
        return yup({
            fullName: required("Please enter full name"),
            mobile: required("Please enter mobile no"),
            email: required("Please enter email").email('Please enter a valid email address.'),
            location: required("Please enter location"),
            city: required("Please select center"),
            state: required("Please select state"),
            password: required("Please enter password"),
        });
    } else if(type==='adduser'){
        return yup({
            fullName: required("Please enter full name"),
            mobile: required("Please enter mobile no"),
            email: required("Please enter email").email('Please enter a valid email address.'),
            password: required("Please enter password"),
        })
    }else if(type==='operator'){
        return yup({
            fullName: required("Please enter full name"),
            mobile: required("Please enter mobile no"),
            email: required("Please enter email").email('Please enter a valid email address.'),
            location: required("Please enter location"),
            city: required("Please select center"),
            state: required("Please select state"),
            password: required("Please enter password"),
            center_id:required("Please select center"),
        })
    }
};

// "name":"Piyush",
// 	"gender":"male",
// 	"mobile":"9752073919",
// 	"email":"piyush@gmail.com",
// 	"user_type_id":"5",
// 	"password":"admin",
// 	"location":"520,Vijay Nagar",
// 	"state":"MP",
// 	"city":"indore",
// 	"latitude":"45.1254",
// 	"longitude":"46.2548"