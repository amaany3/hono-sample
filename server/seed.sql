insert into users (id, name, email) values ('778e7155-798c-4f06-ba52-e93535a60069', 'John Doe', 'john_doe@example.com') ON CONFLICT (email) DO NOTHING;
