package com.example.demo.config;

import org.apache.catalina.filters.CorsFilter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .cors().and().csrf().disable()  // Disable CSRF protection for H2 Console
                .authorizeRequests()
                .antMatchers("/h2-console/**").permitAll()  // Allow access to H2 console
                .antMatchers("/api/**").permitAll()  // Allow all API requests
                .antMatchers("/").permitAll()  // Allow access to root
                .anyRequest().authenticated()  // Other requests need authentication
                .and()
                .headers().frameOptions().sameOrigin();  // Allow H2 Console within same-origin

        return http.build();
    }


}
