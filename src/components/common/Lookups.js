export const Events = {
    'Application':['Started','Completed'],
    'Personal':['Provided','Failed'],
    'License1':['Provided','Transferred','Confirmed','Failed'],
    'License2':['Provided','Transferred','Confirmed','Failed'],
    'Experience':['Provided','Failed'],
    'Financial':['Provided','Failed'],
    'ICA':['Signed','Returned'],
    'Email':['Verified','Failed']
}

export const Entities = {
'Broker':['EXP840-0103-048-066-q4321'],
}

export const EntityEvents = {
    'Broker':['Application','Personal','License1','License2','Experience','Financial','ICA','Email','Firm'],
}
export default Event;