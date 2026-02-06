// src/lib/auth.js
import { supabase } from './supabase';

export const AuthService = {
  // Register admin
  async registerAdmin(email, password, adminCode) {
    // Check admin registration code (store this in environment variables in production)
    const validAdminCode = process.env.ADMIN_REGISTRATION_CODE || 'EazyHireAdmin2024';
    
    if (adminCode !== validAdminCode) {
      throw new Error('Invalid admin registration code');
    }

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            role: 'admin',
            created_at: new Date().toISOString()
          }
        }
      });

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  },

  // Login admin
  async loginAdmin(email, password) {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) throw error;
      
      // Store session
      localStorage.setItem('adminSession', JSON.stringify(data.session));
      localStorage.setItem('adminToken', data.session.access_token);
      
      return data;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  },

  // Logout
  async logout() {
    try {
      await supabase.auth.signOut();
      localStorage.removeItem('adminSession');
      localStorage.removeItem('adminToken');
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    }
  },

  // Check if user is authenticated
  async checkAuth() {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        localStorage.removeItem('adminSession');
        localStorage.removeItem('adminToken');
        return false;
      }

      // Verify user has admin role
      const userRole = session.user.user_metadata?.role;
      if (userRole !== 'admin') {
        await this.logout();
        return false;
      }

      // Store updated session
      localStorage.setItem('adminSession', JSON.stringify(session));
      localStorage.setItem('adminToken', session.access_token);
      
      return true;
    } catch (error) {
      console.error('Auth check error:', error);
      return false;
    }
  },

  // Get current user
  getCurrentUser() {
    const sessionStr = localStorage.getItem('adminSession');
    if (!sessionStr) return null;
    
    try {
      const session = JSON.parse(sessionStr);
      return session.user;
    } catch (error) {
      return null;
    }
  },

  // Reset password
  async resetPassword(email) {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/admin/reset-password`,
      });

      if (error) throw error;
      return true;
    } catch (error) {
      console.error('Password reset error:', error);
      throw error;
    }
  },

  // Update password
  async updatePassword(newPassword) {
    try {
      const { error } = await supabase.auth.updateUser({
        password: newPassword
      });

      if (error) throw error;
      return true;
    } catch (error) {
      console.error('Password update error:', error);
      throw error;
    }
  }
};