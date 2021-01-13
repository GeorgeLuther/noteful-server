INSERT INTO notes (id, title, content, date_created, date_modified, folder_id)
VALUES
  (911, 'Injection post!',
    'This text contains an intentionally broken image <img src="https://url.to.file.which/does-not.exist" onerror="alert(document.cookie); alert(''you just got pretend hacked! oh noes!'');">. The image will try to load, when it fails, it executes malicious JavaScript'),
    '2029-01-22T16:28:32.615Z','2029-01-23T17:28:32.619Z',1;
