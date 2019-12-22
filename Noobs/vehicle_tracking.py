from __future__ import division
import numpy as np
import cv2
import math
from optlang import Variable, Constraint, Objective, Model

file1=open('./trajectoryData.csv', 'w+')
file2=open('./vehicleCount.csv', 'w+')

fgbg = cv2.createBackgroundSubtractorKNN(detectShadows = True)
fgbg.setShadowValue(255)

def mousePosition(event,x,y,flags,param):

    if event == cv2.EVENT_MOUSEMOVE:
        print x,y
        param = (x,y)

def detector(frame):
    areaThreshold_min = 300
    areaThreshold_max = 40000
    exitBoundaryHeight = 250
    fgmask = fgbg.apply(frame)
    ret,thresh = cv2.threshold(fgmask,127,255,0)
    # se = np.ones((4,4), dtype='uint8')
    # image_close = cv2.morphologyEx(thresh, cv2.MORPH_CLOSE, se)
    im2, contours, hierarchy = cv2.findContours(thresh,cv2.RETR_TREE,cv2.CHAIN_APPROX_SIMPLE)
    found=[]
    for i in contours:
        x,y,w,h = cv2.boundingRect(i)
        if w*h>areaThreshold_min and w*h<areaThreshold_max and y<exitBoundaryHeight:
        	[xh,yh] = virtualToRealCoordiantes([x,y,w,h])
        	if xh>0 and yh>-10:
        		found.append([x,y,w,h])
    return found

class MeanShiftTracker:
    def __init__(self, bitsPerColor):
        histSize=bitsPerColor*bitsPerColor*bitsPerColor
        self.m_Epsilon=1.0
        self.m_ItrNum=0
        self.m_ItrNumBound=10
        self.m_SubItrNumBound=10
        self.m_ItrCond=chr(255)
        self.m_PrevRegion=[]
        self.m_CurrRegion=[]
        self.m_BinsPerChannel=bitsPerColor
        self.m_TargetHist=np.zeros((histSize))
        self.m_PrevPosHist=np.zeros((histSize))
        self.m_CurrPosHist=np.zeros((histSize))
        self.m_PrevBhatCoeff=0.0
        self.m_CurrBhatCoeff=-1.0

def draw_detections(img, rects, thickness = 1):
	for x, y, w, h in rects:
		# the HOG detector returns slightly larger rectangles than the real objects.
		# so we slightly shrink the rectangles to get a nicer output.
		pad_w, pad_h = 0,0 #int(0.15*w), int(0.05*h)
		cv2.rectangle(img, (x+pad_w, y+pad_h), (x+w-pad_w, y+h-pad_h), (0, 255, 0), thickness)

def calculatePositionWeightedColorHistogram (frame, box):
    binSize = 16
    histSize = binSize*binSize*binSize
    hist = np.zeros((histSize))
    [c,r,w,h] = box
    im_w= np.size(frame, 0)
    im_h=np.size(frame,1)
    sx=w*0.5
    sy=h*0.5
    if (c<=0 or r<=0 or c+w>=im_w or r+h>=im_h):
    	return hist
    roi = frame[r:r+h, c:c+w]
    for i in range(0,(w-1)):
        for j in range(0,(h-1)):
            weight = float((((i-sx)*(i-sx))/(sx*sx)) + (((j-sy)*(j-sy))/(sy*sy)))
            weight = 1.0 - weight
            if weight>-.00001:
                redBin=int(1/float(binSize)*roi[j,i,2])
                greenBin=int(1/float(binSize)*roi[j,i,1])
                blueBin=int(1/float(binSize)*roi[j,i,0])
                histIndex=int(redBin*binSize*binSize + greenBin*binSize + blueBin)
                hist[histIndex]+=weight
    hist=normalizeHistogram(hist)
    return hist

def calculateBhattacharyaCoeff(hist1, hist2):
    BC = 0.0
    i = 0
    # print hist1[0][0], hist2[0][0]
    for idx in hist1:
        if hist1[i]>0 and hist2[i]>0:
            BC = BC + math.sqrt(hist1[i]*hist2[i])
        i+=1
    return BC

def normalizeHistogram (roi_hist):
	val=0.0
	for i in roi_hist:
		val+= i
	c=0
	for i in roi_hist:
		roi_hist[c]=roi_hist[c]/val
		c+=1
	return roi_hist

def setMeanShiftTracker (mst, box, initHist):
    #box=[x,y,w,h]
    mst.m_CurrRegion=box
    mst.m_PrevRegion=box
    mst.m_TargetHist=initHist
    mst.m_CurrPosHist=initHist
    mst.m_PrevPosHist=initHist
    return (mst)

def getNewRegionRGB(mst, frame):
    newRegion=mst.m_PrevRegion
    sumWX=0.0
    sumWY=0.0
    sumW=0.0
    invBinSize=mst.m_BinsPerChannel/256.0
    rightBotX=mst.m_PrevRegion[0] + mst.m_PrevRegion[2]
    rightBotY=mst.m_PrevRegion[1] + mst.m_PrevRegion[3]
    sx=0.5*mst.m_PrevRegion[2]
    sy=0.5*mst.m_PrevRegion[3]
    cx=mst.m_PrevRegion[0] + sx
    cy=mst.m_PrevRegion[1] + sy
    if (rightBotY>=np.size(frame,1) or rightBotX>=np.size(frame,0) or mst.m_PrevRegion[0]<=0 or mst.m_PrevRegion[1]<=0):
    	return mst.m_PrevRegion
    for y in range(int(mst.m_PrevRegion[1]),int(rightBotY-1)):
        for x in range(int(mst.m_PrevRegion[0]),int(rightBotX-1)):
            normDist = (((x-cx)*(x-cx))/(sx*sx)) + (((y-cy)*(y-cy))/(sy*sy))
            normDist=1.0 - normDist
            if normDist>-.00001:
                redBin=int(invBinSize*frame[y,x,2])
                greenBin=int(invBinSize*frame[y,x,1])
                blueBin=int(invBinSize*frame[y,x,0])
                histIndx=int(redBin*mst.m_BinsPerChannel*mst.m_BinsPerChannel + greenBin*mst.m_BinsPerChannel + blueBin)
                if mst.m_PrevPosHist[histIndx]>0.00001:
                    weightVal=np.sqrt((mst.m_TargetHist[histIndx])/(mst.m_PrevPosHist[histIndx]))
                    sumWY+=y*weightVal
                    sumWX+=x*weightVal
                    sumW+=weightVal
    if sumW>0.00001:
        cx= sumWX/sumW
        cy= sumWY/sumW
        # print cx,cy,(cx-sx),(cy-sy)
        newRegion[0]=int(round(cx-sx))
        newRegion[1]=int(round(cy-sy))
    return newRegion

def iterateRGB(mst, frame):
    mst.m_PrevRegion=mst.m_CurrRegion
    mst.m_PrevPosHist=calculatePositionWeightedColorHistogram(frame, mst.m_PrevRegion)
    mst.m_PrevBhatCoeff=calculateBhattacharyaCoeff(mst.m_TargetHist, mst.m_PrevPosHist)
    mst.m_ItrNum=0
    continueIterations=True
    while continueIterations:
        mst.m_ItrNum+=1
        if mst.m_ItrNum > mst.m_ItrNumBound:
            mst.m_ItrCond=1
            return mst
            # break
        mst.m_CurrRegion = getNewRegionRGB(mst,frame)
        # print mst.m_CurrRegion
        mst.m_CurrPosHist=calculatePositionWeightedColorHistogram(frame, mst.m_CurrRegion)
        mst.m_CurrBhatCoeff=calculateBhattacharyaCoeff(mst.m_TargetHist, mst.m_CurrPosHist)
        abnItr=0
        while mst.m_CurrBhatCoeff<mst.m_PrevBhatCoeff:
            abnItr+=1
            if abnItr>mst.m_SubItrNumBound:
                mst.m_ItrCond=2
                return mst
                # break
            mst.m_CurrRegion[1]=(mst.m_CurrRegion[1] + mst.m_PrevRegion[1])/2
            mst.m_CurrRegion[0]=(mst.m_CurrRegion[0] + mst.m_PrevRegion[0])/2
            mst.m_CurrPosHist=calculatePositionWeightedColorHistogram(frame, mst.m_CurrRegion)
            mst.m_CurrBhatCoeff=calculateBhattacharyaCoeff(mst.m_TargetHist, mst.m_CurrPosHist)
        regDist=int((mst.m_PrevRegion[0]-mst.m_CurrRegion[0])*(mst.m_PrevRegion[0]-mst.m_CurrRegion[0]))
        regDist+=int((mst.m_PrevRegion[1]-mst.m_CurrRegion[1])*(mst.m_PrevRegion[1]-mst.m_CurrRegion[1]))
        mst.m_PrevRegion=mst.m_CurrRegion
        mst.m_PrevPosHist=mst.m_CurrPosHist
        mst.m_PrevBhatCoeff=mst.m_CurrBhatCoeff
        # showTrackedRegion(frame, mst.m_CurrRegion)
        # print mst.m_CurrBhatCoeff, mst.m_PrevRegion, mst.m_CurrRegion
        if regDist<=.00001:
            continueIterations=False
    mst.m_ItrCond=0
    return mst

def updateScaleRGB(mst, frame):
    cx=mst.m_CurrRegion[0]
    cy=mst.m_CurrRegion[1]
    sx_small= mst.m_CurrRegion[2] - 1
    sy_small= mst.m_CurrRegion[3] - 1
    sx_big= mst.m_CurrRegion[2] + 1
    sy_big= mst.m_CurrRegion[3] + 1
    smallRegion=[cx,cy,sx_small,sy_small]
    bigRegion=[cx,cy,sx_big,sy_big]
    smallRegionHist = calculatePositionWeightedColorHistogram(frame, smallRegion)
    bigRegionHist = calculatePositionWeightedColorHistogram(frame, bigRegion)
    smallBhatCoeff = calculateBhattacharyaCoeff(mst.m_TargetHist, smallRegionHist)
    bigBhatCoeff = calculateBhattacharyaCoeff(mst.m_TargetHist, bigRegionHist)
    if smallBhatCoeff>bigBhatCoeff and smallBhatCoeff>mst.m_CurrBhatCoeff:
        mst.m_CurrRegion = smallRegion
    if bigBhatCoeff>smallBhatCoeff and bigBhatCoeff>mst.m_CurrBhatCoeff:
        mst.m_CurrRegion = bigRegion
    return mst

def meanshiftTrackingRGB(mst, frame):
    mst=iterateRGB(mst, frame)
    mst=updateScaleRGB(mst, frame)
    return mst

def showTrackedRegion(frame, box):
    draw_detections(frame, [box])
    cv2.imshow('feed', frame)
    k=cv2.waitKey(0)

# def detector(frame):
# 	hog = cv2.HOGDescriptor()
# 	hog.setSVMDetector( cv2.HOGDescriptor_getDefaultPeopleDetector())

# 	found,w=hog.detectMultiScale(frame, winStride=(8,8), padding=(32,32), scale=1.05)

# 	i=0
# 	for x, y, w, h in found:
# 		pad_w, pad_h = int(0.15*w), int(0.05*h)
# 		found[i] = [x+pad_w, y+pad_h, w-2*pad_w, h- 2*pad_h]
# 		i+=1

# 	# print found
# 	return found




def tracker(objectToTrack, curFrame, term_crit):
    frame = curFrame
    roi_hist = calculatePositionWeightedColorHistogram(curFrame, objectToTrack.trackWindow)
    track_window = objectToTrack.trackWindow
    objectToTrack.tracker = meanshiftTrackingRGB(objectToTrack.tracker, curFrame)
    objectToTrack.trackWindow = objectToTrack.tracker.m_CurrRegion
    objectToTrack.MotionModel = objectToTrack.tracker.m_CurrPosHist
    objectToTrack.ApperanceModel = objectToTrack.MotionModel
    return objectToTrack

# def calculateHistogram(curFrame, box):
# 	[c,r,w,h] = box
# 	roi = curFrame[r:r+h, c:c+w]
# 	hsv_roi =  cv2.cvtColor(frame, cv2.COLOR_BGR2HSV)
# 	mask = cv2.inRange(hsv_roi, np.array((0., 60.,32.)), np.array((180.,255.,255.)))
# 	roi_hist = cv2.calcHist([hsv_roi],[0],mask,[180],[0,180])
# 	cv2.normalize(roi_hist,roi_hist,0,1,cv2.NORM_MINMAX)

# 	return roi_hist

# def normalizeHistogram (roi_hist):
# 	val=0.0
# 	for i in roi_hist:
# 		val+= i
# 	c=0
# 	for i in roi_hist:
# 		roi_hist[c]=roi_hist[c]/val
# 		c+=1
# 	return roi_hist

# def calculateBC(hist1, hist2):
# 	#hist1 = calculatePositionWeightedColorHistogram(img, box1)
# 	#hist2 = calculatePositionWeightedColorHistogram(img, box2)
# 	BC = 0.0
# 	i = 0
# 	# print hist1[0][0], hist2[0][0]
# 	for idx in hist1:
# 		BC = BC + math.sqrt(hist1[i][0]*hist2[i][0])
# 		i+=1

# 	return BC

# def area(a, b):  # returns None if rectangles don't intersect
#     dx = min(a.xmax, b.xmax) - max(a.xmin, b.xmin)
#     dy = min(a.ymax, b.ymax) - max(a.ymin, b.ymin)
#     if (dx>=0	) and (dy>=0):
#         return dx*dy

def calculateOverlap(box1, box2):
	[l1,u1,w1,h1] = box1
	[l2,u2,w2,h2] = box2

	r1 = l1 + w1
	r2 = l2 + w2
	d1 = u1 + h1
	d2 = u2 + h2

	#print l1, u1, r1, d1, l2, u2, r2, d2
	x_overlap = max(0, min(r1, r2) - max(l1,l2))
	y_overlap = max(0, min(d1, d2) - max(u1,u2))
	inter = x_overlap * y_overlap

	union  = (w1*h1) + (w2*h2)
	union = union-inter
	#print "c ", inter, union
	return inter / union


def solveBIP(affinity):
	m = len(affinity)
	n = len(affinity[0])
	variables = {}
	for i in range(0, m):
		variables[i] = {}
		for j in range(0, n):
			var= Variable(name = "{}_{}".format(i, j), lb=0, ub=1, type = "integer")
			variables[i][j] = var

	constraints = []
	for i in range(0, m):
		const = Constraint(sum(variables[i].values()), ub = 1 )
		constraints.append(const)

	for j in range(0,n):
		const = Constraint(sum(row[j] for row in variables.values()), ub=1)
		constraints.append(const)

	obj = Objective(sum(affinity[i][j]*variables[i][j] for i in range(0, m) for j in range(0, n) ))


	model = Model(name = "BIP Solved")
	model.add(constraints)
	model.objective = obj

	status = model.optimize()
	# for var in model.variables:
	# 	print var.name, " : ", var.primal

	mat = np.zeros((m,n))
	#print mat
	for ind in model.variables:
		i, j = ind.name.split("_")
		i = int(i)
		j = int(j)
		mat[i,j] = ind.primal

	return mat

# def matchObjects(hist1, hist2, threshold):
# 	val = calculateBhattacharyaCoeff(hist1, hist2)
# 	if val>=threshold:
# 		return [True, val]
# 	else:
# 		return [False, val]

def matchObjects(frame, targetImage, threshold):
    # the 'Mean Squared Error' between the two images is the
    # sum of the squared difference between the two images;
    # NOTE: the two images must have the same dimension
    threshold=0.9
    frame = imageResize(frame, targetImage)
    val = np.sum((frame.astype("float") - targetImage.astype("float")) ** 2)
    val= val/float(frame.shape[0] * frame.shape[1])/255.0/255.0/3.0
    val=1-val
    # return the MSE, the lower the error, the more "similar"
    # the two images are
    if val>threshold:
        return [True, val]
    else:
        return [False, val]

def imageResize(frame, targetImage):
    res = cv2.resize(frame,(targetImage.shape[1], targetImage.shape[0]), interpolation = cv2.INTER_CUBIC)
    return res

def classify(obj):
	[x, y, w, h] = obj.trackWindow
	aspectRatio  = float(w)/float(h)
	area  = float(w)*float(h)
	if (aspectRatio<0.65 and area<4000.0):
		obj.vehicleCategory = 1
	elif (aspectRatio>0.65 and area<10000):
		obj.vehicleCategory = 2
	elif (area>10000):
		obj.vehicleCategory = 3
	return obj

def virtualToRealCoordiantes(window):
	roadL = 50.0
	roadW = 13.0
	[xtl, ytl, xtr, ytr] = [250,100,370,100]
	[xbl, ybl, xbr, ybr] = [90,330,530,330]
	xc = window[0] + int(window[2]/2)
	yc = window[1] + int(window[3]/2)
	y = roadL  * float((yc - ybl)/(ytl - ybl))
	xcl = float((yc - ytl)*(xbl - xtl)/float(ybl - ytl)) + xtl
	xcr = float((yc - ytr)*(xbr - xtr)/float(ybr - ytr)) + xtr
	x = roadW  * float((xc - xcl)/(xcr - xcl))
	return x,y
	
class OBJ:
    def __init__ (self, GlobalID, LocalID, track_window, frame):
        self.GlobalID = GlobalID
        self.LocalID = LocalID
        self.tracker = MeanShiftTracker(16)
        initHist = calculatePositionWeightedColorHistogram(frame, track_window)
        self.tracker = setMeanShiftTracker(self.tracker, track_window, initHist)
        self.ApperanceModel = self.tracker.m_TargetHist
        self.MotionModel = self.tracker.m_TargetHist
        self.IsActive = True
        self.PassiveTimeSpan = -1
        self.trackWindow = track_window
        self.isCounted = False
        self.vehicleCategory = 0
        self.image = frame[track_window[1]:track_window[1]+track_window[3], track_window[0]:track_window[0] + track_window[2]]
        if track_window[1]>=210:
        	self.isCounted = True
   	def __del__ (self):
   		self.close()

class MOT:
	def __init__ (self, MaxPassiveTimeSpan, matchingThreshold):
		self.GlobalObjectNum = 0
		self.TrackedObjectArray = []
		self.matchingThreshold = matchingThreshold
		self.DetectedObjectNum = None
		self.DetectedObjectArray = []
		self.ActivelyTrackedObjectNum = 0
		self.ActivelyTrackedObjectArray = []
		self.PassivelyTrackedObjectNum = None
		self.PassivelyTrackedObjectArray = []
		self.MaxPassiveTimeSpan = MaxPassiveTimeSpan

	def getActivePassiveInfo(self):  #To populate/update the active and passive tracked object arrays.
		count=0
		exitBoundaryHeight = 250
		self.ActivelyTrackedObjectNum=0
		self.PassivelyTrackedObjectNum =0
		self.ActivelyTrackedObjectArray = []
		self.PassivelyTrackedObjectArray = []
		for o in self.TrackedObjectArray:
			if o.trackWindow[1]>exitBoundaryHeight:
				o.IsActive=False
				o.PassiveTimeSpan = self.MaxPassiveTimeSpan
			if o.IsActive:
				self.ActivelyTrackedObjectArray.insert(self.ActivelyTrackedObjectNum, count)
				self.ActivelyTrackedObjectNum +=1
			else:
				o.PassiveTimeSpan+=1
				if o.PassiveTimeSpan<self.MaxPassiveTimeSpan:
					self.PassivelyTrackedObjectArray.insert(self.PassivelyTrackedObjectNum, count)
					self.PassivelyTrackedObjectNum +=1
				else:
					del o
				# ????? (Should I check for removing the old enough passive object here? And how to remove)
			count+=1


	def ObjectTracker(self, curFrame, term_crit):
		for ind in self.ActivelyTrackedObjectArray:
			objToTrack  = self.TrackedObjectArray[ind]
			ret = tracker(objToTrack, curFrame, term_crit)
			self.TrackedObjectArray[ind] = ret

	def createAffinityMatrix(self, alpha, curFrame):
		mat = []
		for i in self.ActivelyTrackedObjectArray:
			tr = self.TrackedObjectArray[i]   #tr is  tracked object
			trHist = tr.tracker.m_CurrPosHist
			# print self.DetectedObjectArray
			row = []
			for det in self.DetectedObjectArray:    #det is window bix
				detHist = calculatePositionWeightedColorHistogram(curFrame, det)
				BC = calculateBhattacharyaCoeff(trHist, detHist)
				aff = (alpha*calculateOverlap(tr.trackWindow, det)) + BC
				row.append(aff)
			mat.append(row)
		return mat


	def updatePassiveAge(self):
		for i in self.PassivelyTrackedObjectArray:
			self.TrackedObjectArray[i].PassiveTimeSpan +=1


	def multiObjectTracking(self, curFrame):
		self.getActivePassiveInfo()

		self.DetectedObjectArray = detector(curFrame)  #DEtecting the objects in current frame
		self.DetectedObjectNum = len(self.DetectedObjectArray)


		## ???????? Track the objects
		term_crit = ( cv2.TERM_CRITERIA_EPS | cv2.TERM_CRITERIA_COUNT, 10, 1 )
		self.ObjectTracker(curFrame, term_crit)

		# print "DetectedObjectNum",self.DetectedObjectNum,"ActivelyTrackedObjectNum", self.ActivelyTrackedObjectNum
		# print "DetectedObjectArray", self.DetectedObjectArray
		# print "ActivelyTrackedObjectArray", self.ActivelyTrackedObjectArray
		# print "PassivelyTrackedObjectArray", self.PassivelyTrackedObjectArray

		#Cases begin
		#Case 1

					# ????? (Should I check for removing the old enough passive object here? And how to remove)

		#Case 2
		if self.DetectedObjectNum ==0 and self.ActivelyTrackedObjectNum >0:
			j=0
			for i in self.TrackedObjectArray:
				self.TrackedObjectArray[j].IsActive= False
				self.TrackedObjectArray[j].PassiveTimeSpan = 0
				j+=1

		#Case 3
		elif self.DetectedObjectNum >0 and self.ActivelyTrackedObjectNum ==0:
			if(self.PassivelyTrackedObjectNum ==0):
				i=0
				for ind in self.DetectedObjectArray:

					track_window = self.DetectedObjectArray[i]
					[xh,yh] = virtualToRealCoordiantes(track_window)
					if xh>0 and yh>-10:
						new_obj = OBJ(self.GlobalObjectNum, i, track_window, curFrame)

					# roi = curFrame[r:r+h, c:c+w]
					# hsv_roi =  cv2.cvtColor(curFrame, cv2.COLOR_BGR2HSV)
					# mask = cv2.inRange(hsv_roi, np.array((0., 60.,32.)), np.array((180.,255.,255.)))
					# roi_hist = cv2.calcHist([hsv_roi],[0],mask,[180],[0,180])
					# cv2.normalize(roi_hist,roi_hist,0,255,cv2.NORM_MINMAX)
						detHist = calculatePositionWeightedColorHistogram(curFrame, track_window)
						new_obj.MotionModel = detHist
						new_obj.ApperanceModel = detHist
						self.TrackedObjectArray.insert(self.GlobalObjectNum, new_obj)

					# ?????? Now when adding new detected objects, how to update the appearance and position model with the detected window.
					# ????? Will have to see in to the meanshift code for this I guess and relate it.

						self.GlobalObjectNum+=1
					i+=1

			else:
				threshold = self.matchingThreshold
				i=0
				for det in self.DetectedObjectArray:
					detHist = calculatePositionWeightedColorHistogram(curFrame, det)
					j=0
					matched = False
					toRemove = -1
					maxBC=0.0
					for ind in  self.PassivelyTrackedObjectArray:  #Search for matching passive objects
						passiveObj = self.TrackedObjectArray[ind]
						crop = curFrame[det[1]:det[1]+det[3], det[0]:det[0]+det[2]]
						flag,BC = matchObjects(crop, passiveObj.image, threshold)
						if flag and BC>maxBC:
							passiveObj.IsActive = True
							passiveObj.trackWindow = det
							matched = True
							toRemove = ind
							self.TrackedObjectArray[ind] = passiveObj
							maxBC=BC

					if matched ==False:   #No Match Found, add as new object
						[xh,yh] = virtualToRealCoordiantes(det)
						if xh>0 and yh>-10:
							new_obj = OBJ(self.GlobalObjectNum, i, det, curFrame)
							detHist = calculatePositionWeightedColorHistogram(curFrame, det)
							new_obj.MotionModel = detHist
							new_obj.ApperanceModel = detHist
							self.TrackedObjectArray.insert(self.GlobalObjectNum, new_obj)
							self.GlobalObjectNum+=1
					else:
						self.PassivelyTrackedObjectArray.remove(toRemove)

					i+=1

		#Case 4:
		elif self.DetectedObjectNum >0 and self.ActivelyTrackedObjectNum >0:
			affinityMatrix = self.createAffinityMatrix(0.5, curFrame)
			m = len(affinityMatrix)
			n = len(affinityMatrix[0])
			correspondence = solveBIP(affinityMatrix)

			i=0
			for ind in self.ActivelyTrackedObjectArray:
				matched = False
				for j in range(0, n):
					if correspondence[i][j] == 1:
						self.TrackedObjectArray[ind].trackWindow = self.DetectedObjectArray[j]
						matched = True
						break

				if matched==False:
					self.TrackedObjectArray[ind].IsActive = False
					self.TrackedObjectArray[ind].PassiveTimeSpan = 0



				i+=1

			if n>m:
				for j in range (0, n):
					ones = 0
					for i in range(0, m):
						if correspondence[i][j]==1:
							ones+=1
							break

					if ones ==0:
						if self.PassivelyTrackedObjectNum ==0:
							track_window = self.DetectedObjectArray[j]
							[xh,yh] = virtualToRealCoordiantes(track_window)
							if xh>0 and yh>-10:
								new_obj = OBJ(self.GlobalObjectNum, j, track_window, curFrame)
							# detHist = calculatePositionWeightedColorHistogram(curFrame, track_window)
							# new_obj.MotionModel = detHist
							# new_obj.ApperanceModel = detHist
								self.TrackedObjectArray.insert(self.GlobalObjectNum, new_obj)
								self.GlobalObjectNum+=1

						else:
							threshold = self.matchingThreshold
							det = self.DetectedObjectArray[j]
							detHist = calculatePositionWeightedColorHistogram(curFrame, det)
							toRemove= -1
							matched = False
							maxBC=0.0
							for ind in  self.PassivelyTrackedObjectArray:  #Search for matching passive objects
								passiveObj = self.TrackedObjectArray[ind]
								crop = curFrame[det[1]:det[1]+det[3], det[0]:det[0]+det[2]]
								flag,BC = matchObjects(crop, passiveObj.image, threshold)
								if flag and maxBC<BC:
									passiveObj.IsActive = True
									passiveObj.trackWindow = det
									matched = True
									toRemove = ind
									self.TrackedObjectArray[ind] = passiveObj
									maxBC=BC

							if matched ==False:   #No Match Found, add as new object
								[xh,yh] = virtualToRealCoordiantes(det)
								if xh>0 and yh>-10:
									new_obj = OBJ(self.GlobalObjectNum, j, det, curFrame)
								# detHist = calculatePositionWeightedColorHistogram(curFrame, det)
								# new_obj.MotionModel = detHist
								# new_obj.ApperanceModel = detHist
									self.TrackedObjectArray.insert(self.GlobalObjectNum, new_obj)
									self.GlobalObjectNum+=1

							else:
								self.PassivelyTrackedObjectArray.remove(toRemove)


		self.updatePassiveAge()

	def display(self, frame,frameNum, vehicleCount):
		for i in self.TrackedObjectArray:
			# tr = self.TrackedObjectArray[i]
			if i.IsActive:
				font = cv2.FONT_HERSHEY_SIMPLEX
				x, y, w, h = i.trackWindow
				cv2.rectangle(frame, (int(x),int(y)), (int(x+w),int(y+h)), 255,1)
				cv2.putText(frame,str(i.GlobalID),(x + int(w/2),y + int(h/2)), font, 0.55,(0,0,0),1)#,cv2.LINE_AA
				# print "trackWindow", i.trackWindow, i.GlobalID
				if y>=210 and i.isCounted==False and w*h>35*60:
					i=classify(i)
					if i.vehicleCategory!=0:
						vehicleCount[i.vehicleCategory - 1] +=1
					i.isCounted = True
				if (y+h/2)>100:
					[xr,yr] = virtualToRealCoordiantes(i.trackWindow)
					string = str(frameNum) + ',' + str(i.GlobalID) + ',' + str(xr) + ',' + str(yr) + ',' + str(i.vehicleCategory) + '\n'
					#####################Write to file
					# file1.write(string)
					# print string
		print "vehicle count [2W,3W+4W, bus+truck]",vehicleCount
		string = str(frameNum) + ',' + str(vehicleCount[0]) + ',' + str(vehicleCount[1]) + ',' + str(vehicleCount[2]) + '\n'
		#####################Write to file
		file2.write(string)
		cv2.line(frame,(100,210),(500,210),(0,0,255), 1)
		cv2.line(frame,(250,100),(370,100),(0,255,0), 1)
		cv2.line(frame,(90,330),(530,330),(0,255,0), 1)
		
		cv2.setMouseCallback('image', mousePosition)
		cv2.imshow('image', frame)
		# filename = './finalreport/' + str(frameNum) + '.jpg'
		# cv2.imwrite(filename, frame)
		k= cv2.waitKey(100)		


############# Main Function!! ##############################33

if __name__ == '__main__':
	mot = MOT(3, 0.96)
	# print mot.GlobalObjectNum
	# print mot.TrackedObjectArray
	num=0
	vehicleCount = [0,0,0]
	# cap = cv2.VideoCapture('/media/keshav/A6ACEDD0ACED9AD7/Users/Keshav Kothari/Desktop/vids/00031.MTS')
	cap = cv2.VideoCapture('/home/keshav/Desktop/BTP/5.avi')
	minsofFrametoSkip = 0
	while(num<25*60*minsofFrametoSkip): #skip certain frames
		ret, frame = cap.read()
		num+=1

	c=1
	while(1):
		ret, frame = cap.read()
		if ret == False:
			break
		# frame =  cv2.resize(frame,(480, 360), interpolation = cv2.INTER_CUBIC)
		print c, np.size(frame,0), np.size(frame,1)
		mot.multiObjectTracking(frame)
		mot.display(frame,c, vehicleCount)
		ch = 0xFF & cv2.waitKey(1)
		if ch == 27:
			break
		c+=1
	cv2.destroyAllWindows()




#class DET:
#	def detectObjects(curFrame):
#		detector(curFrame, )
