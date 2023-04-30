INSERT INTO Department (name)
VALUES
    ('Magic'),
    ('Hunting'),
    ('Assassinations'),
    ('Healing'),
    ('Frontline'),
    ('Music');
INSERT INTO Title (title, salary,department_id)
VALUES   
    ('Sorcerer', 100000,1),
    ('Warlock',165000,1),
    ('Wizard',165000,1),
    ('Ranger',150000,2),
    ('Druid',110000,2),
    ('Rogue',150000,3),
    ('Swashbuckler',95000,3),
    ('Cleric',88000,4),
    ('Monk',99000,4),
    ('Barbarian',110000,5),
    ('Juggernaut',120000,5),
    ('Bard',300000,6);
INSERT INTO Employees(first_name,last_name,title_id,manager_id)
VALUES 
    ('Beans','McBeanington',1,'Watcher','1'),
    ('Marco','Dragonsack',5,'Watcher','5'),
    ('Domino','Roughbottle',3,'Watcher','3'),
    ('One-eye','Two-legs',3,'Watcher','3'),
    ('Mr','-M',6,'Watcher','6'),
    ('Bubbles','',5'Watcher','5'),
    ('Lord','Jeff',2,'Watcher','2'),
    ('Grand Master','Carl-Sagen',1,'Watcher','1'),
    ('Emanuel','Wizzpoper',4,'Watcher','4');