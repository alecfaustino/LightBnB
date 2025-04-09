TRUNCATE TABLE properties RESTART IDENTITY CASCADE;
TRUNCATE TABLE users RESTART IDENTITY CASCADE;
TRUNCATE TABLE reservations RESTART IDENTITY CASCADE;
TRUNCATE TABLE property_reviews RESTART IDENTITY CASCADE;


INSERT INTO users (name, email, password) 
VALUES ('Alec', 'alecfaustino@outlook.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
('Sage', 'sagethedog@email.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
('Kerstin', 'email@email.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.');

INSERT INTO properties(owner_id, title, description, thumbnail_photo_url, cover_photo_url, cost_per_night, parking_spaces, number_of_bathrooms, number_of_bedrooms, country, street, city, province, post_code, active)
VALUES(1, 'MegaMansion', 'Super Mega Mansion', 'www.photo1.com', 'www.photo2.com', 10000, 12, 12, 24, 'Canada', '123 Street', 'Calgary', 'AB', 'A1B2C4', TRUE),
(2, 'SmallDogHouse', 'Fit for a crazy dog', 'www.dog.com', 'www.doghome.com', 5, 1, 1, 1, 'Canada', '31 Street', 'Calgary', 'AB', 'C4B3A1', FALSE),
(3, 'BV', 'Mid-size Building', 'www.BV.com', 'www.BV1.com', 50, 2, 2, 2, 'Canada', '19 Avenue', 'Calgary', 'AB', 'Z1X2C3', TRUE);

INSERT INTO reservations (start_date, end_date, property_id, guest_id)
VALUES ('2018-09-11', '2018-09-26', 1, 1),
('2019-01-04', '2019-02-01', 2, 2),
('2021-10-01', '2021-10-14', 3, 3);

INSERT INTO property_reviews (guest_id, property_id, reservation_id, rating, message)
VALUES (1, 1 ,1, 5, 'great mansion'),
(2, 2, 2, 2, 'Decent Dog House'),
(3, 3, 3, 1, 'Poor Management');