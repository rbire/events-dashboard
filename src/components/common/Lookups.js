export const Events = {
    'Price':['Increased','Decreased','Corrected'],
    'Contract':['Signed','Cacelled', 'Expired'],
    'Listing':['Active','Pending','Sold'],
    'Offer':['Received','Accepted','Rejected'],
    'Sale':['Pending','Closed'],
    'Construction':['Started','Completed'],
    'Project':['Approved','Rejected'],
    'Documents':['Signed','Uploaded','Updated'],
    'Title':['Changed'],
    'Lein' : ['Recorded','Removed'],
    'Funds' : ['Available','Transferred','Cancelled'],
    'Deed':['Recorded']
}

export const Entities = {
'Agent' :['AGNT001','AGNT002'],
'Broker':['BRK001','BRK002'],
'Builder':['BLD001','BLD002'],
'Buyer':['BYR001','BYR002'],
'City':['CTY001','CTY002'],
'County':['CNTY001','CNTY002'],
'Escrow':['ESC001','ESC002'],
'Lender':['LND001','LND002'],
'MLS':['MLS001','MLS002'],
'Owner':['ONR001','ONR002'],
'Vendor':['VNDR001','VNDR002']
}

export const EntityEvents = {
    'Agent' :['Offer','Contract','Price'],
    'Broker':['Contract','Sale'],
    'Builder':['Construction'],
    'Buyer':['Offer','Contract'],
    'City':['Project','Construction'],
    'County':['Title','Deed'],
    'Escrow':['Documents','Title'],
    'Lender':['Lein','Funds'],
    'MLS':['Listing','Sale','Price'],
    'Owner':['Offer'],
    'Vendor':['Listing']    
}
export default Event;