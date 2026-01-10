import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema({
  // Basic Login Info
  username: {
    type: String,
    required: [true, 'Username is required'],
    unique: true,
    trim: true,
    lowercase: true,
    minlength: 3
  },
  
  passwordHash: {
    type: String,
    required: [true, 'Password is required'],
    minlength: 6
  },

  // Profile Info
  profile: {
    fullName: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true
    },
    phoneNumber: {
      type: String,
      required: true,
      unique: true,
      match: [/^\+91[0-9]{10}$/, 'Invalid Indian phone number']
    },
    dateOfBirth: {
      type: Date,
      required: true
    },
    gender: {
      type: String,
      enum: ['MALE', 'FEMALE', 'OTHER'],
      required: true
    },
    address: {
      type: String,
      required: true,
      trim: true
    }
  },

  // Bank Details
  bankDetails: {
    bankName: {
      type: String,
      required: true,
      trim: true
    },
    accountNumber: {
      type: String,
      required: true
    },
    cifNumber: {
      type: String,
      required: true
    },
    cardNumber: {
      type: String,
      required: true
    },
    cardExpiry: {
      type: String,
      required: true
    }
  },

  // Identity Verification
  identity: {
    aadhaarNumber: {
      type: String,
      required: true,
      unique: true,
      match: /^[0-9]{12}$/
    },
    panNumber: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
      match: /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/
    },
    identityVerified: {
      type: Boolean,
      default: false
    }
  },

  // Loan Applications - THIS IS THE IMPORTANT PART
  loanApplications: [{
    applicationId: {
      type: String,
      required: true,
      unique: true
    },
    loanType: {
      type: String,
      enum: ['Personal', 'Home', 'Car', 'Education', 'Business'],
      default: 'Personal',
      required: true
    },
    loanAmount: {
      type: Number,
      required: true,
      min: 1000
    },
    approvedAmount: {
      type: Number,
      default: 0
    },
    interestRate: {
      type: Number,
      required: true,
      min: 0
    },
    tenure: {
      type: Number,
      required: true,
      min: 6,
      max: 360 // months (30 years max)
    },
    emi: {
      type: Number,
      default: 0
    },
    emiStartDate: {
      type: Date,
      default: null
    },
    status: {
      type: String,
      enum: ['PENDING', 'APPROVED', 'DECLINED', 'PAID'],
      default: 'PENDING'
    },
    creditScore: {
      type: Number,
      min: 0,
      max: 100
    },
    appliedAt: {
      type: Date,
      default: Date.now
    },
    processedAt: {
      type: Date
    }
  }],

  // Role & Status
  role: {
    type: String,
    enum: ['USER', 'ADMIN'],
    default: 'USER'
  },
  
  isActive: {
    type: Boolean,
    default: true
  },
  
  phoneDataConsent: {
    type: Boolean,
    default: false,
    required: true
  },

  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Password hashing
userSchema.pre('save', async function() {
  if (!this.isModified('passwordHash')) return;
  
  this.passwordHash = await bcrypt.hash(this.passwordHash, 10);
});

userSchema.methods.comparePassword = async function(password) {
  return bcrypt.compare(password, this.passwordHash);
};

// Remove sensitive data from JSON output
userSchema.methods.toJSON = function() {
  const user = this.toObject();
  delete user.passwordHash;
  delete user.__v;
  return user;
};

export default mongoose.model('User', userSchema);