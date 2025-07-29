import mongoose from 'mongoose';

const subscriptionSchema = new mongoose.Schema({    
    name:{
        type: String,
        required: [true, 'Subscription name is required'],
        trim: true,
        minLength: 2,
        maxLength: 50
    },
    price:{
        type: Number,
        required: [true, 'Price is required'],
        min:[0,'Price cannot be negative'],
    },
    currency: {
        type: String,
        trim: true,
        default: 'USD',
        enum: ['USD', 'EUR', 'GBP', 'INR', 'JPY'], // Add more currencies as needed
    },
    frequency: {
        type:String,
        enum:['daily','weekly','monthly','yearly'],
    },
    category:
        {
            type: String,
            enum: ['Entertainment', 'Utilities', 'Food', 'Health', 'Education', 'Other'],
            required: [true, 'Category is required']
        },
    paymetnMethod:{
        type: String,
        required: [true, 'Payment method is required'],
        trim:true,
    },
    status:{
        type: String,
        enum: ['active', 'cancelled', 'expired'],
        default: 'active',
    },
    startDate: {
        type: Date,
        required: [true, 'Start date is required'],
        validate:{
            validator:(value)=>value <= new Date(),
            message: function(){
                return 'Start date must be in the past'

            }
        }
    },
    renewalDate: {
        type: Date,
        validate:{
            validator:function(value){returnvalue > this.startDate()},
            message: function(){
                return 'Renewal date must be after the start date';

            }
        }
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'User ID is required'],
        index:true
    }
    
}, { timestamps: true });


//Auto-calculate renewal date if not provided
subscriptionSchema.pre('save', function(next) {
    if (!this.renewalDate) {
        const renewalperiods = { daily: 1, weekly: 7, monthly: 30, yearly: 365 }; 
        this.renewalDate = new Date(this.startDate);
        this.renewalDate.setDate(this.renewalDate.getDate() + renewalperiods[this.frequency]); // Default to one month later
    }
    
    if(this.renewalDate<new Date()){
        this.status='expired'

    }
    next();
});

const Subscription=mongoose.model('Subscription', subscriptionSchema);

export default Subscription