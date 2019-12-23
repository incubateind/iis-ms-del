import pickle


with open("wordvecpickleslash.pickle", 'rb') as f:
    word_vec = pickle.load(f, encoding="latin1")
for i in range(100):
    x = input("Enter a word")
    print(word_vec[x])
    print(word_vec.most_similar(x))
