import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiUser, FiLock, FiEye, FiEyeOff, FiLogIn } from 'react-icons/fi';

export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // 테스트용 임시 조건
    if (form.username === '1234' && form.password === '1234') {
      setTimeout(() => {
        alert('로그인 성공!');
        navigate('/calendar');
        setIsLoading(false);
      }, 1000);
      return;
    }

    try {
      const response = await fetch('/api/members/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await response.json();
      if (response.ok) {
        alert('로그인 성공!');
        navigate('/calendar');
      } else {
        alert(data.message || '로그인 실패');
      }
    } catch (error) {
      console.error('로그인 요청 실패:', error);
      alert('로그인 중 오류가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-purple-500 to-indigo-600 flex items-center justify-center p-4">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-20 h-20 bg-white/10 rounded-full blur-xl"></div>
        <div className="absolute top-40 right-20 w-32 h-32 bg-white/5 rounded-full blur-2xl"></div>
        <div className="absolute bottom-20 left-20 w-24 h-24 bg-white/10 rounded-full blur-xl"></div>
      </div>

      {/* Login Card */}
      <div className="relative bg-white/95 backdrop-blur-lg rounded-3xl p-8 w-full max-w-md shadow-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-2xl mx-auto mb-4 flex items-center justify-center shadow-lg">
            <FiLogIn className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">환영합니다!</h1>
          <p className="text-gray-600">계정에 로그인하세요</p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-6">
          {/* Username Input */}
          <div className="relative">
            <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
              <FiUser className="w-5 h-5" />
            </div>
            <input
              type="text"
              name="username"
              placeholder="아이디를 입력하세요"
              value={form.username}
              onChange={handleChange}
              required
              className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 text-gray-700"
            />
          </div>

          {/* Password Input */}
          <div className="relative">
            <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
              <FiLock className="w-5 h-5" />
            </div>
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              placeholder="비밀번호를 입력하세요"
              value={form.password}
              onChange={handleChange}
              required
              className="w-full pl-12 pr-12 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 text-gray-700"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
            >
              {showPassword ? <FiEyeOff className="w-5 h-5" /> : <FiEye className="w-5 h-5" />}
            </button>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-purple-500 to-indigo-600 text-white py-4 px-6 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center space-x-2"
          >
            {isLoading ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                <span>로그인 중...</span>
              </>
            ) : (
              <>
                <FiLogIn className="w-5 h-5" />
                <span>로그인</span>
              </>
            )}
          </button>
        </form>

        {/* Additional Options */}
        <div className="mt-8 text-center space-y-4">
          <div className="flex items-center justify-center space-x-4 text-sm text-gray-500">
            <button className="hover:text-purple-600 transition-colors">비밀번호 찾기</button>
            <span>•</span>
            <button className="hover:text-purple-600 transition-colors">회원가입</button>
          </div>
          
          {/* Test Account Info */}
          <div className="bg-purple-50 rounded-xl p-4 text-sm">
            <p className="text-purple-700 font-medium mb-1">테스트 계정</p>
            <p className="text-purple-600">ID: 1234 / PW: 1234</p>
          </div>
        </div>
      </div>
    </div>
  );
}