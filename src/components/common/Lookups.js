export const Events = {
    'Application':['Started'],
    'Personal':['Provided'],
    'License1':['Provided','Transferred','Confirmed'],
    'License2':['Provided','Transferred','Confirmed'],
    'Experience':['Provided'],
    'Financial':['Provided'],
    'ICA':['Signed','Returned'],
    'Email':['Verified'],
    'Firm':['Joined']
}

export const Entities = {
'Broker':['EXP-001-43-04'],
}

export const EntityEvents = {
    'Broker':['Application','Personal','License1','License2','Experience','Financial','ICA','Email','Firm'],
}
export default Event;