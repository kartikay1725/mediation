import { NextRequest, NextResponse } from 'next/server';
import dbconnect from '@/lib/db';
import { User } from '@/models/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';

export async function POST(req: NextRequest) {
  await dbconnect();

  const body = await req.json();
  const { email, password,  role } = body;

  if (!email || !role ) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  const user = await User.findOne({ email });
  if (!user) {
    
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }

  if(user.role !== role) {
    return NextResponse.json({ error: 'Role do not match your identity\n\n Acess denied' }, { status: 400 });
  }

   
    if (!password) {
      return NextResponse.json({ error: 'Missing password' }, { status: 400 });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return NextResponse.json({ error: 'Incorrect password' }, { status: 401 });
    }

    
  

  // Set JWT and Cookie
  if (role !== 'admin' && role !== 'mediator') {
  return NextResponse.json({ error: 'Invalid role' }, { status: 400 });
}


const token = jwt.sign({ id: user._id.toString(), role }, process.env.JWT_SECRET!, {
  expiresIn: '1d',
});
  const cookiestore = await cookies();
  cookiestore.set('session', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24,
  });
  if(role === 'admin') {
    return NextResponse.json({
  success: true,
  userId: user._id.toString(), // ✅ Include user ID
  role,
});
  }else {
    return NextResponse.json({
      success: true,
      userId: user._id.toString(), 
      mediatorname: user.name,// ✅ Include user ID
      role,
    });
  }
  
}
