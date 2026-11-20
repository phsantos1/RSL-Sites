import {getStore} from '@netlify/blobs';
import {handleProspecta} from '../prospecta/api.mjs';
export default (request,context)=>handleProspecta(request,{store:getStore({name:'prospecta-private-crm',consistency:'strong'}),env:process.env,ip:context.ip});
